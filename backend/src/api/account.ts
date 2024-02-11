import express, { Request, Response, Router } from 'express'
import prisma from '../index'
import { isAuthenticated } from '../middleware'
const router:Router = express.Router()

router.get('/getAccountDetails', isAuthenticated, async(req:Request, res:Response)=>{
    const  userID  = req.params.token
    try {
        const accountBalance = await prisma.account.findFirst(
            {
                where:{userId:userID},
                select:{
                    user:true
                }
            }
            )
        if(!accountBalance){
            return res.json({
                success:false,
                message:"Could not fetch bank balance"
            }).status(400) 
        }
        return res.json({ 
            success:true,
            accountBalance,
        }).status(200)
    } catch (error) {
        return res.json({ 
            success:false,
            message:error
        }).status(400)
    }

}) 

router.post('/transferFunds/:token', isAuthenticated, async(req:Request , res:Response)=>{
    const {amount } = req.body
    const userID = req.user
    const to = req.params.token
    console.log(to)
    if(userID === undefined){
        return res.status(400).json({
          success:false,
          message:"Failed to Fetch user",
      })
      }
   try {
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
              return  res.json({success:false,message:"Insufficient balance"}).status(400)
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
            message:"Transfer successfull"     
            
        }).status(200)
   } catch (error) {
    console.log(error)
    return res.status(400).json({
        success:false,
        message:'ID invalid'     
        
    })
   }
})


export default router