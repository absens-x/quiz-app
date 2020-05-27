import React, {Component} from 'react'

import axios from '../../axios/axios-quiz'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


import classes from './Quiz.module.scss';
import Loader from '../../components/ui/Loader/Loader';

export default class Quiz extends Component {

    state = {
        results: {}, // отвечает за количество правильных вопросов
        isFinished: false, // отвечает за окончание теста
        activeQuestion: 0, // отвечает за текущий вопрос
        answerStateMessage: null, // отвечает за сообщение о правильности ответа
        quiz: [],
        loading: true
    }

     

    onAnswerClickHandler = (answerId) => {
        
        // Если answerStateMessage не null и ответ правильный прервать функцию,
        // чтобы при многоразовом клике на правильный ответ не закончить тест
        
        if(this.state.answerStateMessage) {
            const key = Object.keys(this.state.answerStateMessage)[0]
            if(this.state.answerStateMessage[key] === "success") {
                return
            }
        }
 
        const question = this.state.quiz[this.state.activeQuestion] // взять из массива quiz активный вопрос (тек. значение activeQuestion)    
        const {results} = this.state
        
        // Если ответ правильный
        if (question.rightAnswerId === answerId) {

            // Если в result нет отвеченного вопроса (его id) тогда добавить его с 
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState((state) => ({ 
                answerStateMessage: {[answerId] : 'success'},
                results 
            }) )

            const timer = setTimeout(() => {

                if(this.isQuizFinished()) {
                    this.setState({isFinished: true})
                }
                else {
                    this.setState((state) => ({
                        activeQuestion: state.activeQuestion++, // переходим к след. вопросу (это создаст новый рендер)
                        answerStateMessage: null, // сбрасываем объект сообщений
                    }))
                    console.log(this.state.activeQuestion)
                }
                clearTimeout(timer)
            }, 1000)
        } 
        else {
            results[question.id] = 'error'
            this.setState((state) => ({
                answerStateMessage: {[answerId] : 'error'},
                results
            }))
        }

        
    }


    // Сбрасываем тест
    onRetryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0, 
            answerStateMessage: null,
        })
    }

    async componentDidMount() {
        // console.log('Quiz ID = ', this.props.match.params.id)
        try {
            const res = await axios.get(`/quizes/${this.props.match.params.id}.json`)
         
            const quiz = res.data
            console.log(res)
            
            this.setState({
                quiz,
                loading: false
            })
        } catch(e) {
            console.log(e)
        }
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        const {quiz, loading, answerStateMessage, activeQuestion, isFinished} = this.state
        return(<div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>

                {
                    (loading)
                    ? <Loader/>
                    : (isFinished)
                        ?   <FinishedQuiz 
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.onRetryHandler}/>
                        :   <ActiveQuiz 
                                answers={quiz[activeQuestion].answers}
                                question={quiz[activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                answerStateMessage={answerStateMessage}
                                />
                }
            </div>
        </div>

        )
    }
}




/* 

Quiz - это обертка для окна теста, в нем изменяются стейты

*/