'use strict'

const Hapi = require('hapi')
let routes = require('./src/routes/route.js')

const server = new Hapi.Server()
server.connection({ port: 4000 })

    server.register(require("hapi-plugin-co"))

    server.route(routes)

server.start((err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server running at: ${server.info.uri}`);
})