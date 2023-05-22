import { Card, CardContent, Typography, Badge, CardActions } from "@mui/material"
import { useState, useEffect } from "react"
import Header from "../Components/Header"
import { GetTestCard } from "../Services/TestCardRequest"
import { request } from "../Services/request"
import { AnkiCard } from "../entities/AnkiCard"

export const TestPage = () => {

  const [cards, setCards] = useState<AnkiCard[]>([])

  useEffect(()=>{
    request.get("/profile").then(({data})=>{
      GetTestCard(data).then((dataCards)=>{
        setCards(dataCards)
      })
    })
  }, [] )

  return (
    <div>
      <Header />
      <Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Вопрос:
            </Typography>
            <Typography variant="h5" component="div" width={"395px"}>
              <text>{cards[0].FrontSide}</text>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">

            </Typography>
            <Typography variant="body2">

            </Typography>
            <Badge badgeContent={cards[0].Topic} color="warning" className=""></Badge>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Card>
    </div>
  )

}
export default TestPage;