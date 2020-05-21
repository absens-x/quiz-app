import React from 'react'

import AnswersList from './AnswersList/AnswersList'

import classes from './ActiveQuiz.module.scss'


const  ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}. </strong> {props.question}
            </span>
            <small> {props.answerNumber} из {props.quizLength}</small>
        </p>
        <AnswersList {...props}/>
    </div>
)


export default ActiveQuiz