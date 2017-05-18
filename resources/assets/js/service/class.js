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

    delete( courseId, id ) {
        return Axios({
            url: '/class/delete',
            method: 'post',
            data: {
                id: id,
                courseId: courseId
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
