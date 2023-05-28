import { Card, CardContent, Typography, Badge, CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { RouteProps } from 'react-router-dom';
import { AnkiCard } from "../entities/AnkiCard";
import { useLocation, useParams } from 'react-router-dom';
import { request } from "../Services/request";
import { Deck } from "../entities/Deck";
import Header from "../Components/Header";

export const SharedCardList: React.FC<RouteProps> = () => {
    const id = useParams();
    const [isFlipped, setIsFlipped] = useState<boolean>(false)
    const [deck, setDeck] = useState<Deck>()
    const flipCard = () => {
        setIsFlipped(prevState => !prevState)
    }
    useEffect(() => {
        request.get<Deck>(`/sharedDecks/${id.id}`).then(data => { setDeck(data.data) })
    }, [])
    if (deck?.cards.length === 0)
        return (
            <>Загрузка</>
        )
    else
        return (
            <><Header />
                <div className="add_buttons">
                    <button className="button" onClick={() => request.get(`/sharedDecks/add/${id.id}`)}>Добавить к себе</button>
                </div>
                <div className='CardList'>
                    {deck?.cards.map((card) => (
                        <div className="Card">
                            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                                <Card sx={{ minWidth: 275 }} onClick={flipCard}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Вопрос:
                                        </Typography>
                                        <Typography variant="h5" component="div" width={"395px"}>
                                            {card.question}
                                        </Typography>

                                    </CardContent>
                                    <Badge badgeContent={card.topic} color="warning" className=""></Badge>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                                <Card sx={{ minWidth: 275 }} onClick={flipCard}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Ответ:
                                        </Typography>
                                        <Typography variant="h5" component="div" width={"395px"}>
                                            {card.answer}
                                        </Typography>
                                    </CardContent>
                                    <Badge badgeContent={card.topic} color="warning" className=""></Badge>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </ReactCardFlip>
                        </div>
                    ))}
                </div></>)
}

