let Injector = require('@middleware/injector')

module.exports = (request, reply)=> {
    data ={}
    data.user = Injector.data
        
    if (request.response.source && request.response.source.context) {
        request.response.source.context.state = '<script> window.__INITIAL_STATE__ = ' + JSON.stringify(data) + '; </script>'
    }
    reply.continue()
}