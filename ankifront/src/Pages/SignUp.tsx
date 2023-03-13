import axios from 'axios';
import React from 'react';
import './Style.scss'


function sendData(login: string, password: string, repeatPassword: string) {
    return axios.post('https://localhost:5001/signup', { login, password, repeatPassword })
        .then(response => response.data)
}

function submit() {
    // @ts-ignore 
    var login = document.getElementById('login').value
    // @ts-ignore
    var password = document.getElementById('password').value
    // @ts-ignore
    var repeatPassword = document.getElementById('repeatPassword').value
    sendData(login, password, repeatPassword)
}

function SignUp() {
    return (
        <div className='bigContainer'>
            <div className='container'>
                <input id='login' className='login' placeholder='Введите логин' />
                <input id='password' className='password' placeholder='Введите пароль' />
                <input id='repeatPassword' className='password' placeholder='Повторите пароль' />
                <button onClick={submit}>Войти</button>
            </div>
        </div>
    )
}

export default SignUp