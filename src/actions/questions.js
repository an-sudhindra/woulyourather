import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from './../utils/api'
import { userAddedQuestion, userAnsweredQuestion } from './users'

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function loadQuestions(questions) {
    return { 
        type: LOAD_QUESTIONS,
        questions,
    }
}

export function addQuestion({question}) {
    // console.log("QUESTION ACTION : ", question)
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion( { optionOneText, optionTwoText, author }) {
    // console.log("QUESTION ACTION : handleAddQuestion")
    return dispatch => {
        dispatch(showLoading())

        return saveQuestion({ optionOneText, optionTwoText, author }).then(
            question => {
                // console.log("REULTS CAME : ", question)
                dispatch(userAddedQuestion( { authedUser: author, questionId: question.id }))
                dispatch(addQuestion({ question }))
                dispatch(hideLoading())
            }
        );
    };
}

export function answerQuestion({authedUser, questionId, answer}){
    return {
        type: ANSWER_QUESTION,
        authedUser,
        questionId,
        answer,
    }
}


export function handleAnswerQuestion({ authedUser, questionId, answer }){
    // console.log("QUESTION ACTION - handleAnswerQuestion")
    return dispatch => {
        dispatch(showLoading())

        return saveQuestionAnswer({ authedUser, qid: questionId, answer }).then( ()=>{
            dispatch(answerQuestion({ authedUser, questionId, answer }))
            dispatch(userAnsweredQuestion({ authedUser, questionId, answer }))
            dispatch(hideLoading())
        })
    }
}