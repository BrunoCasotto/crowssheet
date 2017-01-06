'use strict'
require('module-alias/register')
const Hapi = require('hapi')
let routes = require('@route/route.js')
const Path = require('path')
const Hoek = require('hoek')

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'dist')
            }
        }
    }
})

server.connection({ port: process.env.PORT || 4000 })

server.register(require('vision'), (err) => {
    Hoek.assert(!err, err)
    server.views({
        engines: {
            njk: require('nunjucks-hapi')
        },
        relativeTo: __dirname,
        path: __dirname + '/resources/views'
        , helpersPath: __dirname + '/resources/assets'
    })
})

server.register(require("hapi-plugin-co"))

server.route(routes)

server.register( require('inert'), (err) => {
    if (err) console.log('Failed to load inert plugin.')
    server.route(require('@route/file.js'))
})

server.start((err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server running at: ${server.info.uri}`);
})
