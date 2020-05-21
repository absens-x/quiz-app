import React from 'react'

import classes from './AnswerItem.module.scss'

const  AnswerItem = props => {
    const cls = [classes.QuestionItem]

    if(props.answerStateMessage) {
        cls.push(classes[props.answerStateMessage]) // класс берется из scss модуля, если answerStateMessage не null
    }
    
    return (
        <li className={cls.join(' ')} onClick={()=> props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
     )
}


export default AnswerItem