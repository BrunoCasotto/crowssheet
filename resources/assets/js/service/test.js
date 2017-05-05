import Axios from 'axios';

export default new class TestService { 

	store( userKey, courseKey, classKey, testObject ) {
		return Axios({
			url: '/test/save',
			method: 'post',
			data: {
				userKey : userKey,
				courseKey : courseKey,
				classKey : classKey,
				test : testObject
			}
		})
	}

}
