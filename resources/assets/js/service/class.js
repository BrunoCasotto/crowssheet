import Axios from 'axios';

export default new class ClassService { 

	store( userId, courseId, courseClass ) {
        return Axios({
            url: '/class/save',
            method: 'post',
            data: { 
				userId: userId, 
				courseId: courseId,
				courseClass: courseClass
			}
		})
	}

    getAll( userId ) {
		return Axios({
            url: '/course/all?userId='+userId,
            method: 'get',
            data: {}
        })
	}

    getSingle( userId, id ) {
        return Axios({
            url: `/course?userId=${userId}&id=${id}`,
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

    update( userId, course, id ) {
        console.log(userId, course, id)
        return Axios({
            url: '/course/update',
            method: 'post',
            data: {
                userId: userId,
                course: course,
                id : id
            }
        })
    }
}
