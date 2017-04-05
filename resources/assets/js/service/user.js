import Axios from 'axios';

export default new class CourseService { 

	store( userId, course ) {
        return Axios({
            url: '/course/save',
            method: 'post',
            data: { userId: userId, course: course}
        })
	}

    getAll( userId ) {
		return Axios({
            url: '/user/all',
            method: 'get',
            data: {}
        })
	}
}
