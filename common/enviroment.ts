export const enviroment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  db: { url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/meat-api' },
  security: {
    apiSecret: process.env.API_SECRET || 'api-secret',
    testJwt:
      process.env.JWT_TESTS ||
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.e0xPCF44a9Yf_ch3AVjQsceZwoLSMf01rjronJzN-Ks'
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
    name: 'restful-api'
  }
}
