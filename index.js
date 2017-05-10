require('module-alias/register')
const Hapi = require('hapi')
let routes = require('@route/route.js')
let preResponse = require('@middleware/pre_response.js')
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

server.register( require('inert'), err => {
    if (err) console.log('Failed to load inert plugin.')  
    server.route(require('@route/file.js'))
})

let bind = {
    var: 'content'
}

server.bind( bind )

server.ext('onPreResponse', preResponse)

server.state('session', {
    ttl: null,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

server.start(err => {
    if (err) {
        console.log(err)
    }
    console.log(`Server running at: ${server.info.uri}`);
})
