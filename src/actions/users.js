export const LOAD_USERS = "LOAD_USERS"
export const USER_ADDED_QUESTION = "USER_ADDED_QUESTION"
export const USER_ANSWERED_QUESTION = "USER_ANSWERED_QUESTION"

export function loadUsers(users){
    return {
        type: LOAD_USERS,
        users,
    }
}

export function userAddedQuestion({ authedUser, questionId }) {
    // console.log("USER ACTION : ", authedUser, questionId )
    return {
        type: USER_ADDED_QUESTION,
        authedUser,
        questionId,
    }
}

export function userAnsweredQuestion({authedUser, questionId, answer}){
    // console.log("USER ACTION - userAnsweredQuestion : ", authedUser, questionId, answer)
    return {
        type: USER_ANSWERED_QUESTION,
        authedUser, questionId, answer
    }
}