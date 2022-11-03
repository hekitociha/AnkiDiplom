import { useState } from 'react'
import { FormControl} from '@mui/material';
import '../../Components/Style.scss'
import { createUser } from '../UserHelper';

const NewUserModal = ({ setNewUserModal, getAndSetUserList }) => {

    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const newUser = () => {
        if(login && password){
            createUser(login, password)
                .then(() => {
                    getAndSetUserList()
                    setNewUserModal(false)
                })
        }
    }

    return (
        <div className='modal' onClick={()=>setNewUserModal(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <text>Login</text>
                    <FormControl value={login} onChange={(e) => {setLogin(e.target.value)}}/>
                    <text>Password</text>
                    <FormControl value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    <button onClick={newUser} className="button_add">Зарегестрироваться</button>
                </div>
            </div>
        </div>
    )
}
export default NewUserModal