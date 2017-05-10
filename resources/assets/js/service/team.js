import Axios from 'axios';

export default new class TeamService { 

    store( userId, team ) {
        console.log(team)
        return Axios({
            url: '/team/create',
            method: 'post',
            data: { userId: userId, team: team}
        })
    }

    getAll( userId ) {
        return Axios({
            url: '/team/all?user='+userId,
            method: 'get',
            data: {}
        })
    }

    insertUser( userId, teamId ) {
        return Axios({
            url: '/team/insert-user',
            method: 'post',
            data: {
                teamId: teamId,
                userId: userId
            }
        })
    }

    removeUser( userId, teamId ) {
        return Axios({
            url: '/team/remove-user',
            method: 'post',
            data: {
                teamId: teamId,
                userId: userId
            }
        })
    }

    insertCourse( courseId, teamId ) {
        return Axios({
            url: '/team/insert-course',
            method: 'post',
            data: {
                teamId: teamId,
                courseId: courseId
            }
        })
    }

    removeCourse( courseId, teamId ) {
        return Axios({
            url: '/team/remove-course',
            method: 'post',
            data: {
                teamId: teamId,
                courseId: courseId
            }
        })
    }

}
