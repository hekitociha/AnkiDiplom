import { Badge, Card, CardActions, CardContent, Typography } from "@mui/material"
import './DeckStyle.scss'
import { request } from "../../../../Services/request";
import CircularJSON from 'circular-json';
import { AnkiCard } from "../../../../entities/AnkiCard";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CardList } from "../../../../Pages/CardList";

interface SharedDeckComponentProps {
    topic: string;
    id: number;
}

export const SharedDeckComponent: React.FC<SharedDeckComponentProps> = ({ topic, id }) => {

    const navigate = useNavigate();
    const [cards, setCards] = useState<Array<AnkiCard>>();
    const handleClick = () => {


            navigate(`/sharedDecks/${id}/cards`)

        
    }


    return (
        <div className="divkavnutri" onClick={handleClick}>
            <Card className="card-one card" sx={{ minWidth: 275 }} >
                <CardContent>

                </CardContent>
            </Card>
            <Card className="card-two card" sx={{ minWidth: 275 }} >
                <CardContent>

                </CardContent>
            </Card>
            <Card className="card-three card" sx={{ minWidth: 275 }}>
                <CardContent className="card_content">
                    <Badge badgeContent={topic} className="badge" color="warning"></Badge>
                    
                </CardContent>
            </Card>


        </div>
    )
}