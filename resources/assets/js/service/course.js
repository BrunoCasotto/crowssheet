import Axios from 'axios';

export default new class CourseService { 

	store( course ) {
		return Axios({
            url: '/course/save',
            method: 'post',
            data: {course: course}
        });
	}

    getAll() {
		return Axios({
            url: '/json/course/all',
            method: 'get',
            data: {}
        });
	}

    delete( id ) {
		return Axios({
            url: '/course/delete',
            method: 'post',
            data: {id: id}
        });
	}
}
