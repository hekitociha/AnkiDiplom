import axios from "axios";
import { User } from "../entities/User";
import { AnkiCard } from "../entities/AnkiCard";

export const GetTestCard = async(user: User) => {
    const res = await  axios.post<Array<AnkiCard>>("https://localhost:5001/starttest", user)
    return res.data
}
