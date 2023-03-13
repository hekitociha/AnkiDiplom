import axios from 'axios';
import { useState } from 'react';
import './Style.scss'

import { useNavigate } from "react-router-dom"

function SignIn() {

    const [login, setLogin] = useState("") 
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate();

    const sendData = (e: any) => {
        e.preventDefault()
        return axios.get(`https://localhost:5001/login?login=${login}&password=${password}`)
            .then(response => navigate("/"))
    }

    return (
        <div className='bigContainer'>
            <form onSubmit={sendData} className='container'>
                <label htmlFor='login'>Логин</label>
                <input id='login' value={login} onChange={(e) => setLogin(e.target.value)} className='login' placeholder='Введите логин' />
                <label htmlFor='password'>Пароль</label>
                <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='password' placeholder='Введите пароль' />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}

export default SignIn