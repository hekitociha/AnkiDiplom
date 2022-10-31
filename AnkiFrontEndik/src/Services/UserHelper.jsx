import axios from "axios"
import { API } from "../module/urlConsts"

export const getUsers = async () => {
    const res = await axios.get(API.User.Get)
    return res
}

export const updateUser = async (id, login, password) => {
    const formData = new FormData()

    formData.append('Login', login)
    formData.append('Password', password)
    formData.append('id', id)
    
    const res = await axios.put(`${API.User.Change}${Number(id)}`, formData, 
    {   
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        } 
    })
    return res
}

export const createUser = async (login, password) => {
    await axios.post(`${API.User.Create}?login=${login}`, {
        Login: login,
        Password: password 
    })
}

export const deleteUser = async (userId) => {
    await axios.delete(`${API.User.Delete}${userId}`)
}
