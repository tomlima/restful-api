import {Server} from './server/server'
import { usersRouter } from './users/users.router';
import { productRouter } from './products/products.router';

const server = new Server();
server.bootstrap([usersRouter, productRouter]).then( server => {
    console.log(`Server is running on: ${server.application.address().port} `)
}).catch(error => {
    console.log("Server failed to load")
    console.log(error)
    process.exit(1) 
});