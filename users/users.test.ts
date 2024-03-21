import 'jest'
import * as request from 'supertest'
import {Server} from '../server/server'
import { enviroment } from '../common/enviroment'
import {usersRouter} from './users.router'
import {User} from './users.model'

let server: Server
beforeAll(()=>{
    enviroment.db.url = process.env.DB_URL || 'mongodb://localhost/api-test-db'
    enviroment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([usersRouter])
    .then(() => User.deleteMany({}).exec())
    .catch(console.error)
})

test('Get /users', async ()=>{
    try{
        const response = await request('http://localhost:3001').get('/users');
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    }catch(error){
        throw new Error(error)
    }

})


test('Post /users', async () => {
    const response = await request('http://localhost:3001').post('/users').send({
        name: 'user1',
        email: 'user1@email.com',
        password: '123456'
    }) 
    expect(response.status).toBe(200)
    expect(response.body._id).toBeDefined()
})

afterAll(()=>{
    return server.shutdown()
})