module.exports = [
    {
        method: 'GET',
        path: '/koala',
        handler: function(request, reply) {
            reply.file( 'koala.jpeg', { confine: false })
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
    }
]