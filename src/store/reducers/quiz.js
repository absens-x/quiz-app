import { FETCH_QUIZES_START, 
        FETCH_QUIZ_SUCCESS,
        FETCH_QUIZES_SUCCESS, 
        FETCH_QUIZES_ERROR,
        QUIZ_SET_STATE,
        FINISH_QUIZ,
        QUIZ_NEXT_QUESTION,
        QUIZ_RETRY } from '../actions/actionTypes'


const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {}, // отвечает за количество правильных вопросов
    isFinished: false, // отвечает за окончание теста
    activeQuestion: 0, // отвечает за текущий вопрос
    answerStateMessage: null, // отвечает за сообщение о правильности ответа
    quiz: null,
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerStateMessage: action.answerStateMessage,
                results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerStateMessage: null,
                activeQuestion: action.number
            }
        case QUIZ_RETRY:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0, 
                answerStateMessage: null,
            }

        default:
            return state
    }
}