let routes = require('./home')
	.concat(require('./authentication'))
	.concat(require('./post'))

module.exports = routes