import {combineReducers} from 'redux'
import quizReducer from './quiz'
import quizCreateReducer from './createQuiz'
import authReducer from './authReducer'

export default combineReducers({
    quiz: quizReducer,
    quizCreate: quizCreateReducer,
    auth: authReducer
})