import Axios from 'axios';

export default new class AuthService { 

	isLogged() {
		return Axios({
			url: '/auth/islogged',
			method: 'get',
			data: {}
		});
	}

}
