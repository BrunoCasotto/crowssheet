let AuthService = require('@modules/authentication/service')

module.exports = (request, reply)=> {
    data ={}

    let service = new AuthService()
	service.isSigned().then((result)=>{
        data.user = result
            
        if (request.response.source && request.response.source.context) {
            request.response.source.context.state = '<script> window.__INITIAL_STATE__ = ' + JSON.stringify(data) + '; </script>'
        }
        reply.continue()
    }).catch((error)=> {
        console.log('error', error)
    })
}