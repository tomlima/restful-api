export const enviroment = {
    server: {port: process.env.SERVER_PORT || 3000},
    db: { url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/meat-api' },
    security: {
        apiSecret: process.env.API_SECRET || 'api-secret'
    }
}