
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
    return res.status(400).json({
        message:"User already exist" 
    })
}
const hashedPassword = await bcrypt.hash(password,10)
const randomBalance = Number(500+ Math.random() * 2000)
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
    res.status(200).json({ 
        success:true, 
        message:"Successfully Signed Up",
        user,
        token
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
            
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
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        const isPasswordTrue = await bcrypt.compare(password,user.password)
    
        if(!isPasswordTrue){
            return res.status(400).json({
                success:false,
                message:"Password does not match"
            })
        }
        const secretToken:string = process.env.SECRET_KEY as string
        const token  = jwt.sign({user:user.id},secretToken,{
            expiresIn:'5d'
        }) 
        return res.status(200).json({
            success:true,
            user,
            message:"Successfully logged in",
            token
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
})

router.post('/bulk', isAuthenticated, async(req:Request,res:Response)=>{
    const userID = req.user
    if(!userID){
        return res.status(400).json({success:false,message:"UserID not available"})
    }
    try {
    const allusers = await prisma.user.findMany({
        where:{
            AND:[{username:{contains:req.body.filter ?? ""}},
                { id:{not:userID}}]
        }
    })
    return res.status(200).json({
        success:true,
        allusers
    })
   } catch (error) {
       console.log(error) 
    return res.status(400).json({
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
    return res.status(200).json({
        success:true,
        user
    })
    } catch (error) {
        return res.status(400)  .json({
            success:false,
            message:"Something went wrong"          
        })    
    }
})

router.post('/fetchMyDetails', isAuthenticated, async(req:Request,res:Response)=>{
    const userID = req.user
     if(userID === undefined){
        return res.status(400).json({
          success:false,
          message:"Failed to authenticate user",
      })
      }
    try {
    const user = await prisma.user.findFirst({
        where:{
            id:userID
        },
        select:{
            id:true,
            account:true,
            role:true,
            username:true
        }
        
    })
    return res.status(200).json({
        success:true,
        user
    })
    } catch (error) {
        return res.status(400)  .json({
            success:false,
            message:"Something went wrong"          
        })    
    }
})

export default router