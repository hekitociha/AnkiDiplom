import ReactCardFlip from 'react-card-flip';
import { Card, CardContent, Typography, Button, CardActions, Box, Badge, Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import { User } from '../entities/User';
import { AnkiCard } from '../entities/AnkiCard';
import { request } from "../Services/request";
import { Deck } from '../entities/Deck';
import { DeckComponent } from '../shared/ui/molecules/Deck/Deck';
import Header from '../Components/Header';

const ProfilePage = () => {

  const [newCardFrontSide, setNewCardFrontSide] = useState('');
  const [newCardBackSide, setNewCardBackSide] = useState('');
  const [newDeckTopic, setNewDeckTopic] = useState('');

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

  const handleNewDeckTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeckTopic(event.target.value);
  };

  const handleNewDeckSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDeck: Deck = {
      id: user!.decks.length + 1,
      isPrivate: false,
      isSharedForAll: false,
      isSharedFromLink: false,
      topic: newDeckTopic,
      cards: new Array<AnkiCard>(),
      user: user,
      userId: user!.id,
    };

    user!.decks.push(newDeck);
    request.post("/profile/decks/new", newDeck);

    setNewCardFrontSide('');
    setNewCardBackSide('');
    setNewDeckTopic('');
  };
  if (!user) return <div />
  else
    return (
      <><Header />
        <div>
          <div>
            <img src={user.avatarSrc} alt="Avatar" />
            <h2>{user.email}</h2>
          </div>

          <div>
            <h3>Мои колоды</h3>
            <Grid container spacing={2}>
              {user.decks.map((deck) => (
                <Grid item xs={4} key={deck.id}>
                  <DeckComponent topic={deck.topic} />
                </Grid>
              ))}
            </Grid>

            <h3>Новая колода</h3>
            <form onSubmit={handleNewDeckSubmit}>
              <div>
                <label htmlFor="newDeckTopic">Тема:</label>
                <input type='text' id="newDeckTopic" name="newDeckTopic" value={newDeckTopic} onChange={handleNewDeckTopicChange} />
              </div>
              <button type="submit">Создать</button>
            </form>
          </div>
        </div>
      </>
    )
};

export default ProfilePage;