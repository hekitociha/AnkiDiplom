import { Input, FormControl, Button } from '@mui/material';
import './Style.scss'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useState } from "react"
import { Route } from 'react-router-dom';

function Header() {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <>
            <div className="navbar">
                <div className="navbar left">
                    <img className="nav-img" src="../Anki-icon.svg" width="70" alt="Логотип" />
                    <a className="nav-link" href="/">Главная</a>
                    <a className="nav-link" href="/contacts" >Контакты</a>
                </div>
                <div className="navbar center">
                    <FormControl>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className="navbar right">
                    {isLogin ? (
                        <>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                <text>H</text>
                                <a href="/user"></a>
                            </Avatar>
                            <button className='button' onClick={() => setIsLogin(false)}>Выйти</button>
                        </>
                    ) : (
                        <>
                            <a className="button signin" href="/signin">Войти</a>
                            <a className="button" href="/signup">Зарегистрироваться</a>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default Header;