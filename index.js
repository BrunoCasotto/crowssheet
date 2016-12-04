'use strict'
require('module-alias/register')
const Hapi = require('hapi')
let routes = require('@route/route.js')
const Path = require('path');
const Hoek = require('hoek');
const server = new Hapi.Server()

server.connection({ port: 4000 })

server.register(require('vision'), (err) => { 

    Hoek.assert(!err, err)

    server.views({
        engines: {
				njk: require('nunjucks-hapi')   
			}, 
        relativeTo: __dirname,     
        path: 'resources/views'
    })
})

server.register(require("hapi-plugin-co"))

server.route(routes)

server.start((err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server running at: ${server.info.uri}`);
})
  