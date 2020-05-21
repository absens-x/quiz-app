import React, {Component} from 'react'

import Backdrop from '../../ui/Backdrop/Backdrop'

import classes from './Drawer.module.scss'

const links = [
    1,2,3
]

export default class Drawer extends Component {
    
    renderLinks = () => {
        return links.map((link, i) => {
            return (<li key={i}>
                <a href="">Link {link}</a> 
            </li>)
        })
    }
    
    render() {

        const cls = [classes.Drawer]

        if(!this.props.isOpen) {
            cls.push(classes.close)
        }
        
        return (<React.Fragment>

            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
            { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
        </React.Fragment>)
     }
}

 