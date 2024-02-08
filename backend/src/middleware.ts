import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
      interface Request {
        user?: user; 
      }
    }
  }

interface user {
    user: number,
    iat:number
}

export async function isAuthenticated (req:Request, res:Response, next:NextFunction){
    try {
      const token = req.headers.authorization?.split(' ')[1] as string
      const secretToken:string = process.env.SECRET_KEY as string
  
      const verified = await jwt.verify(token,secretToken) as { user:user }
      if(!verified){
          return res.json({
              success:false,
              message:"Failed to authenticate user",
              status:400
          })
      } 
      req.user = verified.user
    } catch (error) {
      return res.json({
        success:false,
        message:"SOMETHING WENT WRONG" + error
      })
    }
    next()
}