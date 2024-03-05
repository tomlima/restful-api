import { Server } from 'restify'
import {Router} from '../common/router'
import {User} from './users.model'

class UsersRouter extends Router {
  applyRoutes(application: Server) {
      /*------------------
      Getting all users
      ------------------*/
      application.get('/users', async (req,resp,next) => { 
          try{
              const users = await User.find()
              resp.json(users)
              return next()
            }catch(error){
              next(error)
            }
        })
      
      /*--------------------
      Getting a single user
      --------------------*/
      application.get("/users/:id", async (req,resp,next) => {
          try{
              const user = await User.findById(req.params.id)
              resp.json(user)
              return next()
            }catch(error){
              next(error)
            }
        })
      
      /*------------------
      Create a new user
      ------------------*/
      application.post("/users", async (req, resp, next) => {
          try{
              let user = new User(req.body);  
              const result = await user.save() 
              result.password  = undefined
              resp.json(result)
              return next() 
            }catch(error){
              next(error)
            }
        })
      
      /*------------------
      Update a single user
      ------------------*/
      application.put("/users/:id",async(req,resp,next) => {
        const options = {runValidators: true}
        try{  
          const result = await User.findByIdAndUpdate({_id:req.params.id}, req.body, options)
          resp.json(result)
          return next()
        }catch(err){
          next(err)
        }	  
        })
      
      /*------------------
      Delete a single user
      ------------------*/
      application.del("/users/:id", async (req,resp,next) => {
          try{
              await User.deleteOne({_id: `${req.params.id}`})
              resp.send(204)
            }catch(err){
              if(err.kind === 'ObjectId'){
                  resp.send(404)
                }
              resp.send(500)
            }
          return next()
        })
    }
}

export const usersRouter = new UsersRouter ()
