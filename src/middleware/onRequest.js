
const onRequest = (request, reply) => {
  if(request.state.user_uid) {
    reply().redirect('/dashboard')
  } else {
    reply.continue()
  }
}

module.exports = onRequest
