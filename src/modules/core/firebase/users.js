import Firebase from './base'

class User extends Firebase {

	login(email, passwd) {
		// super.auth.login("password", {
        //   email: email,
        //   password: passwd,
        //   rememberMe: true
        // })
		this.auth.signInWithEmailAndPassword(email, passwd).catch(function(error) {
        })
		console.log(this.auth.currentUser)
      }

}

export default User
