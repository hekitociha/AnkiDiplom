import { Card, CardContent, Typography, Button, CardActions, Box, Badge } from "@mui/material";
import { useState } from "react"
import ReactCardFlip from 'react-card-flip';
import { useSpring, animated } from 'react-spring';
import Header from "../Components/Header";
import axios from "axios";
import { AnkiCard, User } from "./ProfilePage";
import { GetTestCard } from "../Services/TestCardRequest";


export const TestPage = async (user: User) => {

  let { data: cards } = await GetTestCard(user);

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