import { Input, FormControl, Button } from '@mui/material';
import './Style.scss'
import { request } from '../Services/request';
import Cookie from "js-cookie";
import { ProfileAvatar } from '../shared/ui/atoms/Avatar/Avatar';

export const Header = () => {

    const token = Cookie.get("token");

    return (
        <>
            <div className="navbar">
                <div className="navbar left">
                    <img className="nav-img" src="http://localhost:3000/Anki-icon.svg" width="70" alt="Логотип" />
                    <a className="nav-link" href="/">Главная</a>
                </div>
                <div className="navbar center">
                    <FormControl>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className="navbar right">
                    {!!token ? (
                        <>
                            <a className='avatar' href = '/profile' >
                                <ProfileAvatar />
                            </a>
                            <button className='button' onClick={() => {request.get("/signout")}
                        }>Выйти</button>
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