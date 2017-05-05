let Injector = require('@middleware/injector')

module.exports = (request, reply)=> {

    if(request.response.variety === "view") {
        if (request.session) {
            request.response.source.context.state = '<script> window.__INITIAL_STATE__ = '
            + JSON.stringify(request.session) + '; </script>'
        }
    }

    if(request.response.isBoom) {
        if(request.response.output.statusCode === '404') {
            //do here
        } else if(request.response.output.statusCode === '500') {
            //do here
        }
    }

    reply.continue()
}