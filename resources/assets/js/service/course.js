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
            url: '/course/all?userId='+userId,
            method: 'get',
            data: {}
        })
	}

    delete( userId, id ) {
		return Axios({
            url: '/course/delete',
            method: 'post',
            data: {
                id: id,
                userId: userId
            }
        })
	}
}
