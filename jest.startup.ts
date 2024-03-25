import * as jestCli from 'jest-cli'
import {Server} from './server/server'
import { enviroment } from './common/enviroment'
import {usersRouter} from './users/users.router'
import {User} from './users/users.model'

let server: Server

const beforeAllTests = ()=>{
    enviroment.db.url = process.env.DB_URL || 'mongodb://localhost/api-test-db'
    enviroment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([usersRouter])
        .then(() => User.deleteMany({}).exec())
        .then( async ()=>{ 
            let admin = new User()
            admin.name = 'admin'
            admin.email = 'admin@email.com'
            admin.password = '123456'
            admin.profiles = ['admin','user']
            return await admin.save()
        })
        .catch(console.error)
}

const afterAllTests = () => {
    return server.shutdown()
}


(async () =>{
    try{
        await beforeAllTests()
        await jestCli.run()
        afterAllTests()
    }catch(error){
        console.error
    }
})()