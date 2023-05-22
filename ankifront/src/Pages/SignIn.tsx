import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import './StyleForSignInSignUp.scss'
import { request } from "../Services/request";
import { Link, Navigate } from "react-router-dom";

interface IFormData {
    Email: string;
    Password: string;
}

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        Email: "",
        Password: "",
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFormData((prevState: IFormData) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const [authorized, setAuthorized] = useState<boolean>(false)

    const [visible, setVisible] = useState<boolean>(false)
    const onClose = () => setVisible(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await request.post("signin", formData);
            console.log(response.data);
            if (response.data.isAuthorized === true) {
                document.cookie = `token=${response.data.token}`
                setAuthorized(response.data.isAuthorized)               
            }
            else if (!visible) return null 
            else return(<div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
              <div className='modal-header'>
                <span className='modal-close' onClick={onClose}>
                  &times;
                </span>
              </div>
              <div className='modal-body'>
                <div className='modal-content'>{response.data.error}</div>
              </div>
            </div>
          </div>)

            // Handle successful registration
        } catch (error) {
            console.error(error);
            // Handle registration error
        }
    };

    if (authorized) return <Navigate to="/profile"/>
    else
    return (
        <div className="signForm">
            <div className="logo">
                <img src="../Anki-icon.svg" width="70" alt="Логотип" />
                <text className="logo Text">Anki - тренажер для запоминания</text>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="username" className="Text">Логин:</label>
                <input
                    className="row"
                    type="text"
                    id="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password" className="Text">Пароль:</label>
                <input
                    className="row"
                    type="password"
                    id="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                    required
                />
                <button className="buttonSign" type="submit">Войти</button>
            </form>
        </div>
    );
};

export default SignIn;