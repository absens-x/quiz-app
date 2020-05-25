import React, {Component} from 'react'

import Button from '../../components/ui/Button/Button'
import Input from '../../components/ui/Input/Input'
import Select from '../../components/ui/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
 
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import classes from './QuizCreator.module.scss'


function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
        }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = () => {
        
    }

    addQuestionHandler = (e) => {
        e.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = (e) => {
        e.preventDefault()
        console.log(this.state.quiz)
    }

    inputChangeHandler = (value, controlName) => {
        const {formControls} = this.state
        const control = {...formControls[controlName]}

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    selectChangeHandler = (e) => {
        
        this.setState({
            rightAnswerId: +e.target.value
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
      
            return (<Auxiliary key={controlName + i}>
                <Input 
                {...control}
                onChange={(e) => this.inputChangeHandler(e.target.value, controlName)}  
                shouldValidate={!!control.validation}/>
                { (i === 0) ? <hr/> : null } 
            </Auxiliary>)
        })
    }

    render() {
  
        return (
            <div className={classes.QuizCreator}>
                <div>
                <h1>Создание теста</h1>
                    <div className={classes.CreateQuiz}>
                        <form onSubmit={this.submitHandler}>
                            {this.renderInputs()}

                            <Select label="Выберите правильный ответ" 
                                value={this.state.rightAnswerId}
                                onChange={this.selectChangeHandler}
                                options={[
                                    {text: 1, value: 1},
                                    {text: 2, value: 2},
                                    {text: 3, value: 3},
                                    {text: 4, value: 4},
                                ]}/>

                            <Button type="primary" disabled={!this.state.isFormValid} onClick={this.addQuestionHandler}>Добавить вопрос</Button>
                            <Button type="success"  disabled={this.state.quiz.length === 0}  onClick={this.createQuizHandler}>Создать тест</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}










// Основная цель данной страницы это заполнить вопросами массив quiz в стейте.

/* 

Все что здесь происходит это валидация полей формы и заполнение вопросами массив quiz

*/