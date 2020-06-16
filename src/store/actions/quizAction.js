import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_START, 
        FETCH_QUIZES_SUCCESS, 
        FETCH_QUIZ_SUCCESS, 
        FETCH_QUIZES_ERROR,
        QUIZ_SET_STATE,
        FINISH_QUIZ,
        QUIZ_NEXT_QUESTION,
        QUIZ_RETRY} from './actionTypes.js'

// Загрузка всех тестов
export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart)
        try {
            const res = await axios.get('/quizes.json')
      
            const quizes = []
            Object.keys(res.data).forEach((item, i) => {
                quizes.push({
                    id: item,
                    name: `Тест № ${i + 1}`
                })
            })
            
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            console.log(fetchQuizesError)
        }
    }
}


export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START,
    }
}


export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}


// Загрузка теста по id


export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart()) // для изменения стейта loading

        try {
            const res = await axios.get(`/quizes/${quizId}.json`)
         
            const quiz = res.data
            dispatch(fetchQuizSuccess(quiz))
            
            
        } catch(e) {
            dispatch(fetchQuizesError()) // для изменения стейта error
        }
    }
}



export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz:  quiz
    }
}   



export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
        
    }
}



export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        // Если answerStateMessage не null и ответ правильный прервать функцию,
        // чтобы при многоразовом клике на правильный ответ не закончить тест
        const state = getState().quiz
        if(state.answerStateMessage) {
            const key = Object.keys(state.answerStateMessage)[0]
            if(state.answerStateMessage[key] === "success") {
                return
            }
        }
        
        const question = state.quiz[state.activeQuestion] // взять из массива quiz активный вопрос (тек. значение activeQuestion)    
        const results = state.results
        
        // Если ответ правильный
        if (question.rightAnswerId === answerId) {
            
            // Если в result нет отвеченного вопроса (его id) тогда добавить его с 
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            
            dispatch(quizSetState(
                {[answerId]: 'success'},
                results
            ))
            
            const timer = setTimeout(() => {
                
                if(isQuizFinished(state)) {
                    dispatch(finishQuiz())
                }
                else {
                    
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                clearTimeout(timer)
            }, 1000)
        } 
        else {
            results[question.id] = 'error'
            dispatch(quizSetState({
                [answerId]: 'error'},
                results
            ))
            
        }
        
    }
}


export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}


// local functions

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

function quizSetState(answerStateMessage, results) {
    return {
        type: QUIZ_SET_STATE,
        answerStateMessage,
        results
    }


}