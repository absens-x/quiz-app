import React from 'react'
import classes from './Input.module.scss'


// Проверка на валидность, было ли поле изменено и должно ли оно валидироваться
function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched 
}

const Input = props => {

  const InputType = props.type || 'text' // Тип поля input(type)
  const cls = [classes.Input]
  const htmlFor = `${InputType}-${Math.random()}` // id для label, создаем разные id для корректной работы

  if(isInvalid(props)) {
    cls.push(classes.invalid) // Проверяем вылидность данных, если true то добавить класс для красной подсветки 
  }

  return (<div className={cls.join(' ')}>
    <label htmlFor={htmlFor}>{props.label}</label>
    <input 
      type={InputType} 
      id={htmlFor}
      value={props.value}
      onChange={props.onChange}/>

      {isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}
      
  </div>
  )
}

export default Input