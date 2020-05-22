import React, {Component} from 'react'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


import classes from './Quiz.module.scss';

export default class Quiz extends Component {

    state = {
        results: {}, // отвечает за количество правильных вопросов
        isFinished: false, // отвечает за окончание теста
        activeQuestion: 0, // отвечает за текущий вопрос
        answerStateMessage: null, // отвечает за сообщение о правильности ответа
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 3,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Белый', id: 2},
                    {text: 'Синий', id: 3},
                    {text: 'Красный', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Кто такой Джон Уик?',
                rightAnswerId: 1,
                answers: [
                    {text: 'Убийца', id: 1},
                    {text: 'Клоун', id: 2},
                    {text: 'Строитель', id: 3},
                    {text: 'Прогер', id: 4},
                ]
            }
        ]
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

    componentDidMount() {
        // console.log('Quiz ID = ', this.props.match.params.id)
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        const {quiz, answerStateMessage, activeQuestion, isFinished} = this.state
        return(<div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>
                {
                    (isFinished)
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