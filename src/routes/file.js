module.exports = [
    {
        method: 'GET',
        path: '/favicon.ico',
        handler: function(request, reply) {
            reply.file( 'favico.ico', { confine: false })
        }
    },
    {
        method: 'GET',
        path: '/css/{filename*}',
        handler: {
            directory: {
                path: 'css/'
            }
        }
    },
    {
        method: 'GET',
        path: '/images/{filename*}',
        handler: {
            directory: {
                path: 'images/'
            }
        }
    },
    {
        method: 'GET',
        path: '/js/{filename*}',
        handler: {
            directory: {
                path: 'js/'
            }
        }
    },
    {
        method: 'GET',
        path: '/fonts/{filename*}',
        handler: {
            directory: {
                path: 'fonts/'
            }
        }
    }
]
