import React, {Component} from 'react'
import {connect} from 'react-redux'

import axios from '../../axios/axios-quiz'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quizAction'
import classes from './Quiz.module.scss';
import Loader from '../../components/ui/Loader/Loader';

class Quiz extends Component {
 

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id) 
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }
 
    render() {
        const {results, quiz, loading, answerStateMessage, activeQuestion, isFinished} = this.props
 
        return(<div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>

                {
                    (loading || !quiz)
                    ? <Loader/>
                    : (isFinished)
                        ?   <FinishedQuiz 
                                results={results}
                                quiz={quiz}
                                onRetry={this.props.retryQuiz}/>
                        :   <ActiveQuiz 
                                answers={quiz[activeQuestion].answers}
                                question={quiz[activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
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





function mapStateToProps(state) {
    return {
        results: state.quiz.results, // отвечает за количество правильных вопросов
        isFinished: state.quiz.isFinished, // отвечает за окончание теста
        activeQuestion: state.quiz.activeQuestion, // отвечает за текущий вопрос
        answerStateMessage: state.quiz.answerStateMessage, // отвечает за сообщение о правильности ответа
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)