import { LOAD_USERS, USER_ADDED_QUESTION, USER_ANSWERED_QUESTION } from '../actions/users'

export default function users( state = {}, action){
	// console.log(action.type);
	switch(action.type) {
		case LOAD_USERS: 
			return {
				...state, 
				...action.users
			}
		case USER_ADDED_QUESTION:
			// console.log("USER REDUCER :", action)
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					questions: [ ...state[action.authedUser].questions, action.questionId]
				}
			}
		case USER_ANSWERED_QUESTION:
			// console.log("USER REDUCER : ", action)
			return {
				...state,
				[action.authedUser]:{
					...state[action.authedUser],
					answers:{
						...state[action.authedUser].answers,
						[action.questionId]: action.answer
					}
				}
			}
		default: return state
	}
}