import { Input, FormControl, Button } from '@mui/material';
import './Style.scss'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useState } from "react"
import { NavLink, Route } from 'react-router-dom';
import { request } from '../Services/request';

function Header() {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <>
            <div className="navbar">
                <div className="navbar left">
                    <img className="nav-img" src="../Anki-icon.svg" width="70" alt="Логотип" />
                    <a className="nav-link" href="/">Главная</a>
                </div>
                <div className="navbar center">
                    <FormControl>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className="navbar right">
                    {isLogin ? (
                        <>
                            <a className='avatar' href = '/profile' >
                                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                    <text>H</text>                                    
                                </Avatar>
                            </a>
                            <button className='button' onClick={() => request.get("/signout")}>Выйти</button>
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