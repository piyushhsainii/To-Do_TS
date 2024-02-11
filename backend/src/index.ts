import express, { Request, Response } from 'express'
import userRouter from './api/user'
import accountRouter from './api/account'
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
const prisma = new PrismaClient()


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

//routers
app.use('/api',userRouter)
app.use('/api/',accountRouter)


app.listen(3000,()=>{
    console.log("Server has been started on  PORT"+3000)
})

app.get('/',(req:Request,res:Response)=>{
    res.send('Working')
}) 

export default prisma
