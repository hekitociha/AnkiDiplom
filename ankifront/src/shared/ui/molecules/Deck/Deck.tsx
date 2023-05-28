import { Badge, Card, CardActions, CardContent, Typography } from "@mui/material"
import './DeckStyle.scss'
import { request } from "../../../../Services/request";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnkiCard } from "../../../../entities/AnkiCard";

interface DeckComponentProps {
  topic: string;
  id: number;
}

export const DeckComponent: React.FC<DeckComponentProps> = ({ topic, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${id}/cards`)
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
