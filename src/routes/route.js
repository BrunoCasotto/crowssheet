let routes = require('./home')
	.concat(require('./authentication'))
	.concat(require('./post')).
	concat(require('./dashboard'))
module.exports = routes