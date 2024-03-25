import * as restify from 'restify'
import {User} from '../users/users.model'
import * as jwt from 'jsonwebtoken'
import { enviroment } from '../common/enviroment'

export const tokenParser: restify.RequestHandler = (req,res,next)=>{
    const token = extractToken(req)
    if(token){
        jwt.verify(token,enviroment.security.apiSecret, applyBearer(req,next))
    }else{
        next()
    }
}

function extractToken(req: restify.Request){
    const authorization = req.header('authorization')
    let token = undefined
    if(authorization){
        const parts : string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token =  parts[1]
        }
    }
    return token
}

function applyBearer(req:restify.Request, next): (error,decoded) => void {
    return async (error,decoded)=>{
        if(decoded){
            const user = await User.findByEmail(decoded.sub)
            if(user){
                req.authenticated = user
            }
            next()
        }else{
            next()
        }
    }
}