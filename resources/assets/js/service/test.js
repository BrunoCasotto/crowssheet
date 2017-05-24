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

	update( userKey, courseKey, classKey, testObject ) {
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

	delete( userKey, courseKey, classKey ) {
		return Axios({
			url: '/test/delete',
			method: 'post',
			data: {
				userKey : userKey,
				courseKey : courseKey,
				classKey : classKey
			}
		})
	}

	answer( userId, courseId, classId, answer, item ) {
		return Axios({
			url: '/test/answer',
			method: 'post',
			data: {
				userId : userId,
				classId : classId,
				courseId: courseId,
				answer : answer,
				item: item
			}
		})
	}

}
