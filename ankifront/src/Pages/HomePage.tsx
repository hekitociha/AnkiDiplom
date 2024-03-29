import { Card, CardContent, Typography, Button, CardActions, Box, Badge } from "@mui/material";
import { useEffect, useState } from "react"
import ReactCardFlip from 'react-card-flip';
import { useSpring, animated } from 'react-spring';
import Header from "../Components/Header";
import './StyleForHomePage.scss'
import { request } from "../Services/request";
import Cookie from "js-cookie";

export const HomePage = () => {

  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const flipCard = () => {
    setIsFlipped(prevState => !prevState)
  }

  const titleAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const subtitleAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000,
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1500,
  });

  return (
    <>
      <Header/>
      <div className="container">
        <div className="maintext">
          <animated.h1 style={titleAnimation} className="HomePageText">Anki - тренажер для запоминания</animated.h1>
          <animated.p style={subtitleAnimation} className="HomePageText">
            Здесь вы можете создавать и изучать колоды карточек для запоминания информации
          </animated.p>
          <animated.div style={buttonAnimation} >
            <button className="button">Создать колоду</button>
            <a className="button" href="/sharedDecks">Выбрать колоду</a>
          </animated.div>
        </div>
        <div className="Card">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Card sx={{ minWidth: 275 }} onClick={flipCard}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Вопрос:
                </Typography>
                <Typography variant="h5" component="div" width={"395px"}>
                  Какой-то умный вопрос?
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  
                </Typography>
                <Typography variant="body2">

                </Typography>
                <Badge badgeContent={"тема"} color="warning" className=""></Badge>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
            <Card sx={{ minWidth: 275 }} onClick={flipCard}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Ответ:
                </Typography>
                <Typography variant="h5" component="div" width={"395px"}>
                  Какой-то умный ответ
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  
                </Typography>
                <Typography variant="body2">

                </Typography>
              </CardContent>
              <Badge badgeContent={"тема"} color="warning" className=""></Badge>
              <CardActions>
              </CardActions>
            </Card>
          </ReactCardFlip>
        </div>
      </div>
    </>
  )
}

