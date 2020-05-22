import React, {Component} from 'react'

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drower from '../../components/Navigation/Drawer/Drawer'

import classes from './Layout.module.scss'

export default class Layout extends Component {

    state = {
        menu: false
    }

    // Переключатель кнопки menu: !menu
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }


    // Переключатель кнопки menu: false
    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        
        return(<div  className={classes.Layout}>
            <Drower isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
            <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu}/>
            <main>
                {this.props.children}
            </main>
        </div>)
    }
}






/* 

Все выполняется за счет классов в css, здесь только триггеры для их установки или удаления в DOM

*/