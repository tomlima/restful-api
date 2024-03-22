import 'jest'
import * as request from 'supertest'

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

test('Get /users/:id - not found', async () => {
    try{
        const response = await request('http://localhost:3001').get('/users/aaaaaa');
        expect(response.status).toBe(404)
    }catch(error){
        throw new Error(error)
    }
})

test('Update /users/:id', async ()=>{
    const postResponse = await request('http://localhost:3001').post('/users').send({
        name: 'user2',
        email: 'user2@email.com',
        password: '123456'
    }) 
    const updateResponse = await request('http://localhost:3001').put(`/users/${postResponse.body._id}`).send({
        name: 'user2 - put',
        email: 'user2@email.com',
        password: '123456'
    }) 
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body._id).toBeDefined()
})

