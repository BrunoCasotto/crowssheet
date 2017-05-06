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

    update( userId, courseId, id, courseClass ) {
        console.log(userId, courseId, id, courseClass)
        return Axios({
            url: '/class/update',
            method: 'post',
            data: {
                userId: userId,
                courseId: courseId,
                courseClass: courseClass,
                id : id
            }
        })
    }
}
