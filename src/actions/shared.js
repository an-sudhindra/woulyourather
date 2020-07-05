import { getInitialData } from '../utils/api'
import { loadUsers } from './users'
import { loadQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(loadUsers(users))
                dispatch(loadQuestions(questions))
                // dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}