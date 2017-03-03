import Axios from 'axios';

export default new class CourseService { 

	store( course ) {
		return Axios({
            url: '/course/save',
            method: 'post',
            data: {course: course}
        });
	}
}
