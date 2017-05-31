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

    insertComment( courseId, id, courseClass, comment ) {
        return Axios({
            url: '/class/insert-comment',
            method: 'post',
            data: {
                courseId: courseId,
                courseClass: courseClass,
                id : id,
                comment: comment
            }
        })
    }

    getComments (courseId, id, number) {
        return Axios({
            url: `/class/get-comment/${courseId}/${id}/${number}`,
            method: 'get',
            data: {
                courseId: courseId,
                id : id
            }
        })
    }
}
