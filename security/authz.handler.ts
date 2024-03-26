import * as restify from 'restify'
import { ForbiddenError } from 'restify-errors'


export const authorize: (...profiles: string[])=> restify.RequestHandler = (...profiles)=>{
    return (req,res,next)=>{
        if((<any>req).authenticated !== undefined && (<any>req).authenticated.hasAny(...profiles)){
            req.log.debug('User %s is authorized with profiles  %j on route %s',
            req.authenticated._id, req.authenticated.profiles, req.path())
            next()
        }else{
            req.log.debug('Permission denied for %s. Required profiles: %j. User profiles %j',
            req.authenticated._id, profiles, req.authenticated.profiles)
            next(new ForbiddenError("Permission Denied"))
        }
    }
}