let routes = require('./home')
	.concat(require('./authentication'))
	.concat(require('./post'))
	.concat(require('./dashboard'))
	.concat(require('./static'))
	.concat(require('./course'))
module.exports = routes