import { LOAD_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function questions( state={}, action){
    switch(action.type){
        case LOAD_QUESTIONS: 
            return { 
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            // console.log("QUESTION REDUCER :",action)
            return {
                ...state,
                [action.question.id]: action.question
            }
        case ANSWER_QUESTION:
            // console.log("QUESTION REDUCER : ", action)
            const { authedUser, questionId, answer} = action
            return {
                ...state,
                [questionId]:{
                    ...state[questionId],
                    [answer]: {
                        ...state[questionId][answer],
                        votes: [...state[questionId][answer].votes, authedUser]
                    }
                }
            }
        default:
            return state
    }
}