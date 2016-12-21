let firebase = require('@modules/core/firebase')

class HomeService extends firebase{

	getPosts() {
		let call = this.database.ref('posts');

		call.on('value', function(posts) {
			return posts
		})
	}

	store() {
		this.database.ref('users').set({
			username: 'Bruno',
			email: 'casottoalves'
		})
	}
}
module.exports = HomeService 