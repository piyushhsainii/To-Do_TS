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



export default router