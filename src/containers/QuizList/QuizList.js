import React, {Component} from 'react'
import axios from '../../axios/axios-quiz'

import classes from './QuizList.module.scss'

import { NavLink } from 'react-router-dom'
import Loader from '../../components/ui/Loader/Loader'


export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map((quiz, i) => {
            return (<li key={quiz.id}>
                <NavLink to={'/quiz/' + quiz.id}>
                    {quiz.name}
                </NavLink>
            </li>)
        })
    }

    async componentDidMount() {
        
        try {
            const res = await axios.get('/quizes.json')
      
            const quizes = []
            Object.keys(res.data).forEach((item, i) => {
                quizes.push({
                    id: item,
                    name: `Тест № ${i + 1}`
                })
            })
            console.log(quizes)
            this.setState({
                quizes, loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }
    
    render() {
        return (
            <div className={classes.QuizList}>
                <h1>QuizList</h1>
                {
                this.state.loading
                    ?  <Loader/>
                    : <ul>{this.renderQuizes()}</ul>
                }
            </div>
        )
    }
}