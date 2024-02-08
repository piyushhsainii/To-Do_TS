
import express, { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../index'
import { isAuthenticated } from '../middleware'


const router = express.Router()

//signup
router.post('/signUp',async(req:Request,res:Response)=>{
const { username, password ,role } = req.body
    try {
        const userExist = await prisma.user.findFirst({where:{username:username}})
if(userExist){
    return res.json({
        status:400, 
        message:"User already exist" 
    })
}
const hashedPassword = await bcrypt.hash(password,10)
const randomBalance = Number(1+ Math.random() * 2000)
const finalBalance= Number(randomBalance.toFixed(2))
const user = await prisma.user.create({
    data:{
            username,
            password:hashedPassword,
            role,
            account:{
                create:{
                         balance:finalBalance
                       }
                    }
        }
         })
    const secretToken:string = process.env.SECRET_KEY as string
    const token  = jwt.sign({user:user.id},secretToken)
    res.json({ 
        status:200,
        success:true, 
        user,
        token
    })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong",
            status:400
        })
    }
})


//signin api
router.post('/signin',async(req:Request,res:Response)=>{
    const { username , password } = req.body 
    try {
        const user = await prisma.user.findFirst({
            where:{username:username},
            include:{
                account:{select:{balance:true}}
            }
        })
        if(!user){
            return res.json({
                success:false,
                message:"User does not exist",
                status:400
            })
        }
        const isPasswordTrue = await bcrypt.compare(password,user.password)
    
        if(!isPasswordTrue){
            return res.json({
                success:false,
                message:"Password does not match",
                status:400
            }) 
        }
        const secretToken:string = process.env.SECRET_KEY as string
        const token  = jwt.sign({user:user.id},secretToken,{
            expiresIn:'5d'
        }) 
        return res.json({
            success:true,
            user,
            token,
            status:200
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong",
            status:400
        })
    }
})

router.post('/bulk', isAuthenticated, async(req:Request,res:Response)=>{
    try {
    const  filter  = req.body.filter ?? "" as string
    const allusers = await prisma.user.findMany({
         where:  filter ? { username:{contains:filter} } : {}
    })
    return res.json({
        success:true,
        status:200,
        allusers
    })
   } catch (error) {
       console.log(error) 
    return res.json({
        status:400,
        success:false,
        message:"Something went wrong" + error
    })    
   }
})

router.post('/fetchUser',async(req:Request,res:Response)=>{
    const { userID } = req.body
    try {
    const user = await prisma.user.findFirst({
        where:{
            id:userID
        }
    })
    return res.json({
        success:true,
        status:200,
        user
    })
    } catch (error) {
        return res.json({
            success:false,
            status:400,
            message:"Something went wrong"
        })        
    }
})

export default router