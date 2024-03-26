module.exports = {
  apps : [{
    name   : "restful-api",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster",
    env: {
      SERVER_PORT: 5000
    }
  }]
}
