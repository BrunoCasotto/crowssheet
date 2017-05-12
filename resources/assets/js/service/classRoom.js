import Axios from 'axios';

export default new class ClassRoomService { 

	getUserTeams( userId ) {
		return Axios({
			url: `/classroom/teams/${userId}`,
			method: 'get',
			data: {}
		})
	}

	getTeamCourses( teamId ) {
		return Axios({
			url: `/classroom/courses/${teamId}`,
			method: 'get',
			data: {}
		})
	}
}
