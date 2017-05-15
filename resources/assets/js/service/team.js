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

    insertUser( userId, teamId, ownerId ) {
        return Axios({
            url: '/team/insert-user',
            method: 'post',
            data: {
                teamId: teamId,
                userId: userId,
                ownerId: ownerId
            }
        })
    }

    removeUser( userId, teamId, ownerId ) {
        return Axios({
            url: '/team/remove-user',
            method: 'post',
            data: {
                teamId: teamId,
                userId: userId,
                ownerId: ownerId
            }
        })
    }

    insertCourse( courseId, teamId, ownerId ) {
        return Axios({
            url: '/team/insert-course',
            method: 'post',
            data: {
                teamId: teamId,
                courseId: courseId,
                ownerId: ownerId
            }
        })
    }

    removeCourse( courseId, teamId, ownerId ) {
        return Axios({
            url: '/team/remove-course',
            method: 'post',
            data: {
                teamId: teamId,
                courseId: courseId,
                ownerId: ownerId
            }
        })
    }

    update( userId, teamId, team ) {
        return Axios({
            url: '/team/update',
            method: 'post',
            data: {
                teamId: teamId,
                team: team,
                userId: userId
            }
        })
    }

}
