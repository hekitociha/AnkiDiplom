import React, { useState } from "react";
import axios from "axios";
import './StyleForSignInSignUp.scss'

interface IFormData {
    login: string;
    password: string;
    repeatPassword: string;
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        login: "",
        password: "",
        repeatPassword: "",
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://localhost:5001/signup", formData);
            console.log(response.data);
            // Handle successful registration
        } catch (error) {
            console.error(error);
            // Handle registration error
        }
    };

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
                    id="login"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password" className="Text">Пароль:</label>
                <input
                    className="row"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="repeatPassword" className="Text">Повторите пароль:</label>
                <input
                    className="row"
                    type="repeatPassword"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="buttonSign">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default SignUp;