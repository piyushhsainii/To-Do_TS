import express, { Request, Response, Router } from 'express'
import prisma from '../index'
import { isAuthenticated } from '../middleware'
const router:Router = express.Router()

router.post('/getAccountDetails', isAuthenticated, async(req:Request, res:Response)=>{
    const { userID } = req.body
    const accountBalance = await prisma.account.findFirst({where:{userId:userID}})
    if(!accountBalance){
        return res.json({
            success:false,
            message:"Could not fetch bank balance",
            status:400
        }) 
    }
    return res.json({ 
        success:true,
        accountBalance,
        status:200
    })

})

router.post('/transferFunds', isAuthenticated, async(req:Request , res:Response)=>{
    const { userID , to , amount } = req.body
    await prisma.$transaction(async(p)=>{
    const sender =  await p.account.update({
        data:{
            balance:{decrement:amount}
        },
        where:{
            userId:userID
        }
        })
        if(sender.balance < 0) {
            res.json({success:false,message:"Insufficient balance"}).status(400)
        }
        const receiver = await p.account.update({
            data:{
                balance:{increment:amount}
            },
            where:{
                userId:to
            }
        })
    })
    return res.json({
        status:200,
        message:"Transfer successfull"     
    })
})


export default router