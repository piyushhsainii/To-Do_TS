import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
      interface Request {
        user?: Number; 
      }
    }
  }

export async function isAuthenticated (req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization?.split(' ')[1] as string
    const secretToken:string = process.env.SECRET_KEY as string

    const verified = await jwt.decode(token,secretToken) 
    if(!verified){
        return res.json({
            success:false,
            message:"Failed to authenticate user",
            status:400
        })
    }
    req.user = verified.user
    console.log(req.user)
    next()
}