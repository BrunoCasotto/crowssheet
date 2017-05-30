import Axios from 'axios';

export default new class ReportService { 

    getStudents ( userId ) {
        return Axios({
            url: `/report/students/${userId}`,
            method: 'get',
            data: {}
        })
    }

    getRanking ( type ) {
        return Axios({
            url: `/report/user-ranking/${type}`,
            method: 'get',
            data: {}
        })
    }
}
