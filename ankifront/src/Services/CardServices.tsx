import axios from "axios";
import { API } from '../UrlConsts';

export const getProductsWithFilters = async (pageNum: any, searchString: any, filter: { topic: any; }) => {
    const res = await axios.get(`${API.Cards.Get}?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString ?? ""}&topic=${filter.topic}`)
    return res.data
}

export const getProductsFromSearch = async (pageNum: any, searchString: any) => {
    const res = await axios.get(`${API.Cards.Get}?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString}`)
    return res.data
}

export const getAllProducts = async (pageNum: any) => {
    const res = await axios.get(`${API.Cards.Get}?PageNumber=${pageNum}&PageSize=6`)
    return res.data
}

export const updateProduct = async (idProduct: any, data: { [x: string]: string | Blob; }) => {
    const formData = new FormData()

    const arrKeys = Object.keys(data)

    arrKeys.forEach(key => {
        formData.append(`${key}`, data[key])
    });

    await axios.put(`${API.Cards.Update}${idProduct}`,
        formData,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        }
    )
}

export const postProduct = async (data: { [x: string]: string | Blob; }) => {
    const formData = new FormData()

    const arrKeys = Object.keys(data)

    arrKeys.forEach(key => {
        formData.append(`${key}`, data[key])
    });

    await axios.post(API.Cards.Post, formData)
}

export const deleteProduct = async (idProduct: any) => {
    return await axios.delete(`${API.Cards.DeleteOne}${idProduct}`)
}