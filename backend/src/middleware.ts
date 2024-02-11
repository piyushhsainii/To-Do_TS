import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
      interface Request {
        user?: string; 
      }
    }
  }


export async function isAuthenticated (req:Request, res:Response, next:NextFunction){
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if(token === undefined){
        return res.status(400).json({
          success:false,
          message:"Failed to authenticate user",
      })
      }
      const secretToken:string = process.env.SECRET_KEY as string 

      const verified = await jwt.verify(token,secretToken) as { user:string }
      if(!verified){
          return res.status(400).json({
              success:false,
              message:"Failed to authenticate user",
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