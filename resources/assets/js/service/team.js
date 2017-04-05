import Axios from 'axios';

export default new class TeamService { 

	store( userId, team ) {
        return Axios({
            url: '/team/create',
            method: 'post',
            data: { userId: userId, team: team}
        })
	}

	getAll( userId ) {
        return Axios({
            url: '/team/create',
            method: 'post',
            data: { userId: userId, team: team}
        })
	}

}
