import React, { Component } from 'react';
import { FormControl, Input} from '@mui/material';
import './Style.scss'
import NewUserModal from '../Services/Modals/UserModal';


export default class Header extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar left">
                    <a href="/"><img className="nav-img" src="../Anki-icon.svg" width="70" alt="ico"></img></a>
                    <a className="nav-link" href="/">Главная</a>
                    <a className="nav-link" href="/contacts" >Контакты</a>
                </div>
                <div className="navbar center">
                    <FormControl>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className="navbar right">
                    <button className="button signin" onClick>Войти</button>
                    <button className="button" onClick={NewUserModal}>Зарегистрироваться</button>
                </div>
            </div>
            )
    }
}