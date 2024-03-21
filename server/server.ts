import * as restify from 'restify'
import * as mongoose from 'mongoose'

import { enviroment } from '../common/enviroment'
import {Router} from '../common/router'
import { handleError } from './error.handler'

export class Server {

    application: restify.Server

    initializeDb(): Promise<typeof mongoose>{
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(enviroment.db.url)
    }

    initRoutes(routers: Router[]) : Promise<any>{
        return new Promise(  (resolve, reject) => {
            try{
                this.application =  restify.createServer({
                    name: "restful-api",
                    version: "1.0.0"
                })
                
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())

                //Routes
                for(let router of routers){
                    router.applyRoutes(this.application); 
                }

                this.application.listen(enviroment.server.port, () => {
                    resolve(this.application)
                })

                this.application.on("restifyError", handleError)
            }catch(error){
                reject(error)
            }
        })
    }

    async bootstrap(routers: Router[] = []): Promise<Server>{
        try {
            await this.initializeDb()
            await this.initRoutes(routers)
            return this;
        }catch(error){
            throw error;
        }
    }

    shutdown(){
        return mongoose.disconnect().then(()=>{
            this.application.close()
        })
    }
}