import React, {Component} from 'react'
import {connect} from 'react-redux'

import {auth} from '../../store/actions/auth'

import classes from './Auth.module.scss'
import Button from '../../components/ui/Button/Button'
import Input from '../../components/ui/Input/Input'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid: false, // Будет false пока все поля не будут валидными
        formControls: { // Для каждого поля ввода настраиваем валидацию
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true)

        /* try {
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKzBU_Ewrv1fZ-Ps8Q_A7EHJff9scYLgI', authData)
            console.log(res)
        } catch(e) {

        } */
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true)
        
        
    }

    submitHandler = (e) => {
        e.preventDefault()
    }


    validateControl(value, validation) {
        if(!validation) {return true}

        let isValid = true
        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        
        if(validation.email) {

            isValid = validateEmail(value) && isValid
        }
        
        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (e, controlName) => {

        const formControls = {...this.state.formControls} // Забираем объект formControls для доступа по имени controlName
        const control = {...formControls[controlName]} // Забираем все свойства конкретного поля (например все свойства formControls.email)
 

        control.value = e.target.value // Мутируем control, ставим свойству value текущее значение
        control.touched = true // Пользователь начал что-то вводить в поле
        control.valid = this.validateControl(control.value, control.validation) // Проверка валидности

        formControls[controlName] = control // Готовим новый объект formControls для переопределния стейта

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid // Форма прошла проверку
        })
        
        console.log(e.target.value)
        this.setState({
            isFormValid,
            formControls, 
        })
    }

    renderInputs = () => {

        // Инициализируем inputs с текущий состоянием, ставим каждому все свойства конкретного поля
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
      
            return (
                
                <Input 
                    key={controlName + i} 
                    {...control}
                    onChange={(e) => this.onChangeHandler(e, controlName)} // Привязываем обработчик изменения поля, передаем каждому controlName для последующего доступа к formControls
                    shouldValidate={!!control.validation} /> // Должно ли поле волидироваться, то есть ли такое свойство как validation у control (!!control.validation)
            )
        })
    }
    
    render() {
        return (
            <div className={classes.Auth}>
                <h1>Авторизация</h1>

                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                    
                    {this.renderInputs()}

                    <Button type="success" disabled={!this.state.isFormValid} onClick={this.loginHandler}>Войти</Button>
                    <Button type="primary" disabled={!this.state.isFormValid} onClick={this.registerHandler}>Регистрация</Button>
                </form>
            </div>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}


export default connect(null, mapDispatchToProps)(Auth)