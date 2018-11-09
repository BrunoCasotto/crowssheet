

const verifyIsFile = (path) => {
  return path.search(/.js|.css|.jpeg|.png|.svg/) != -1 ? true : false
}

const getUidByCookie = (cookies) => {
  const cookieMatch = cookies.match(new RegExp('(^| )user_uid=([^;]+)'))
  return cookieMatch? cookieMatch[2] : null;
}

const authMiddleware = (request, reply) => {
  if(verifyIsFile(request.path)) {
    reply.continue()
  }

  const uid = getUidByCookie(request.headers.cookie)
  reply.continue()
  // if(uid) {
  //   reply.continue()
  // } else {
  //   request.setUrl('/')
  //   reply.continue()
  // }
}

module.exports = authMiddleware
