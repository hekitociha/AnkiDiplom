import ReactCardFlip from 'react-card-flip';
import { Card, CardContent, Typography, Button, CardActions, Box, Badge } from "@mui/material";
import { useEffect, useState } from 'react';
import { User } from '../entities/User';
import { AnkiCard } from '../entities/AnkiCard';
import { request } from "../Services/request";
import { render } from '@testing-library/react';

const ProfilePage = () => {

  const [newCardFrontSide, setNewCardFrontSide] = useState('');
  const [newCardBackSide, setNewCardBackSide] = useState('');
  const [newCardTopic, setNewCardTopic] = useState('');

  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const flipCard = () => {
    setIsFlipped(prevState => !prevState)
  }

  const [user, setUser] = useState<User>()

  useEffect(() => {
    request.get("/profile").then(data => {
      setUser(data.data)
    })
  }, [])

  const handleNewCardFrontSideChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardFrontSide(event.target.value);
  };

  const handleNewCardBackSideChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardBackSide(event.target.value);
  };

  const handleNewCardTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardTopic(event.target.value);
  };

  const handleNewPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCard: AnkiCard = {
      Id: user!.cards.length + 1,
      FrontSide: newCardFrontSide,
      BackSide: newCardBackSide,
      Topic: newCardTopic,
      userId: user!.id,
      user: user
    };

    user!.cards.push(newCard);
    request.post("/add", newCard);

    setNewCardFrontSide('');
    setNewCardBackSide('');
    setNewCardTopic('');
  };
  if (!user) return <div/>
  else
  return (
    <div>
      <div>
        <img src={user.avatarSrc} alt="Avatar" />
        <h2>{user.email}</h2>
      </div>

      <div>
        <h3>My Posts</h3>
        <ul>
          {user.cards.map((card) => (
            <li key={card.Id}>
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card sx={{ minWidth: 275 }} onClick={flipCard}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Вопрос:
                    </Typography>
                    <Typography variant="h5" component="div" width={"395px"}>
                      <text>{card.FrontSide}</text>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">

                    </Typography>
                    <Typography variant="body2">

                    </Typography>
                    <Badge badgeContent={card.Topic} color="warning" className=""></Badge>
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
                      <text>{card.BackSide}</text>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">

                    </Typography>
                    <Typography variant="body2">

                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </ReactCardFlip>
            </li>
          ))}
        </ul>

        <h3>Новая карточка</h3>
        <form onSubmit={handleNewPostSubmit}>
          <div>
            <label htmlFor="newCardFrontSide">Вопрос:</label>
            <textarea id="newCardFrontSide" name="newCardFrontSide" value={newCardFrontSide} onChange={handleNewCardFrontSideChange} />
          </div>
          <div>
            <label htmlFor="newCardBackSide">Ответ:</label>
            <textarea id="newCardBackSide" name="newCardBackSide" value={newCardBackSide} onChange={handleNewCardBackSideChange} />
          </div>
          <div>
            <label htmlFor="newCardTopic">Тема:</label>
            <input type='text' id="newCardTopic" name="newCardTopic" value={newCardTopic} onChange={handleNewCardTopicChange} />
          </div>
          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  )
};

export default ProfilePage;