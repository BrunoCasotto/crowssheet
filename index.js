require('module-alias/register')
const Hapi = require('hapi')
const routes = require('@route/route.js')
const preResponse = require('@middleware/preResponse.js')
const authMiddleware = require('@middleware/auth.js')
const Path = require('path')

const viewsConfig = {
  engines: {
    njk: require('nunjucks-hapi')
  },
  relativeTo: __dirname,
  path: __dirname + '/resources/views',
  helpersPath: __dirname + '/resources/assets'
}
const serverConfig = {
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'dist')
      }
    },
    state: {
      strictHeader: false,
      ttl: 1,
      isSecure: false
    }
  }
}
const server = new Hapi.Server(serverConfig)

const start = async () => {
  server.connection({ port: process.env.PORT || 4005 })

  await server.register(require('vision'))
  server.views(viewsConfig)

  server.register(require("hapi-plugin-co"))

  server.route(routes)

  await server.register(require('inert'))
  await server.route(require('@route/file.js'))

  server.ext('onPreResponse', preResponse)
  server.ext('onRequest', authMiddleware)
  server.start()
}

start()