import { Card, CardContent, Typography, Badge, CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { RouteProps, useNavigate } from 'react-router-dom';
import { AnkiCard } from "../entities/AnkiCard";
import { useLocation, useParams } from 'react-router-dom';
import { request } from "../Services/request";
import { Deck } from "../entities/Deck";
import { AnkiCardDTO } from "../entities/AnkiCardDTO";
import CircularJSON from 'circular-json';
import Header from '../Components/Header';
import { ClassNames } from "@emotion/react";

export const CardList: React.FC<RouteProps> = () => {
    const id = useParams();
    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState<boolean>(false)

    const flipCard = () => {
        setIsFlipped(prevState => !prevState)
    }
    const [deck, setDeck] = useState<Deck>()
    const [newCardFrontSide, setNewCardFrontSide] = useState('');
    const [newCardBackSide, setNewCardBackSide] = useState('');

    const handleNewCardFrontSideChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCardFrontSide(event.target.value);
    };

    const handleNewCardBackSideChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCardBackSide(event.target.value);
    };

    useEffect(() => {
        request.get<Deck>(`/profile/decks/${id.id}`).then(data => { setDeck(data.data) })
    }, [])

    const handleNewCardSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newCardDTO: AnkiCardDTO = {
            question: newCardFrontSide,
            answer: newCardBackSide,
            topic: deck!.topic,
            isFavorite: false,
        };
        const jsonString = CircularJSON.stringify(newCardDTO);
        request.post(`/profile/${id.id}/cards/new`, jsonString).then(data => { window.location.reload() });


    };
    const handleOnClickDeleteDeck = () => {
        request.delete(`/profile/decks/delete/${id.id}`)
        navigate(`/profile`)
    }
    const handleOnClickDeleteCard = (id: number) => {
        request.delete(`/profile/cards/delete/${id}`)
        window.location.reload()
    }
    if (deck?.cards.length === 0) {


        return (
            <>
                <Header />
                <div className="add_buttons">
                    <button className="button" onClick={() => request.get(`/profile/decks/shareforall/${id.id}`)}>Поделиться</button>
                    <button className="button" onClick={handleOnClickDeleteDeck}>Удалить</button>
                </div>
                <h3 className="Text">Новая карточка</h3>
                <form onSubmit={handleNewCardSubmit} className='form'>
                    <label htmlFor="newCardFrontSide" className="Text">Вопрос:</label>
                    <textarea id="newCardFrontSide" name="newCardFrontSide" className='row' value={newCardFrontSide} onChange={handleNewCardFrontSideChange} />
                    <label htmlFor="newCardBackSide" className="Text">Ответ:</label>
                    <textarea id="newCardBackSide" name="newCardBackSide" className='row' value={newCardBackSide} onChange={handleNewCardBackSideChange} />
                    <button type="submit" className='button'>Создать</button>
                </form>
            </>)
    }

    else {
        return (
            <>
                <Header />
                <div className="add_buttons">
                    <button className="card_button" onClick={() => request.get(`/profile/decks/shareforall/${id}`)}>Поделиться</button>
                    <button className="card_button" onClick={() => request.get(`/profile/decks/delete/${id}`)}>Удалить</button>
                </div>
                <h3 className="Text">Новая карточка</h3>
                <form onSubmit={handleNewCardSubmit} className='form'>
                    <div>
                        <label htmlFor="newCardFrontSide" className="Text">Вопрос:</label>
                        <textarea id="newCardFrontSide" name="newCardFrontSide" className='row' value={newCardFrontSide} onChange={handleNewCardFrontSideChange} />
                    </div>
                    <div>
                        <label htmlFor="newCardBackSide" className="Text">Ответ:</label>
                        <textarea id="newCardBackSide" name="newCardBackSide" className='row' value={newCardBackSide} onChange={handleNewCardBackSideChange} />
                    </div>
                    <button type="submit" className='button'>Создать</button>
                </form>
                <div className='CardList'>
                    {deck?.cards.map((card) => (
                        <div className="Card">
                            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                                <>
                                    <div className="add_buttons">
                                        <button onClick={() => handleOnClickDeleteCard(card.id)}>удалить</button>
                                    </div>
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
                                </>
                                <>
                                    <div className="add_buttons">
                                        <button onClick={() => handleOnClickDeleteCard(card.id)}>удалить</button>
                                    </div>
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
                                </>
                            </ReactCardFlip>
                        </div>
                    ))}
                </div></>
        )
    }


}

