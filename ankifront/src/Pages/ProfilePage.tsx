import { useEffect, useState } from 'react';
import { User } from '../entities/User';
import { AnkiCard } from '../entities/AnkiCard';
import { request } from "../Services/request";
import { Deck } from '../entities/Deck';
import { DeckComponent } from '../shared/ui/molecules/Deck/Deck';
import Header from '../Components/Header';
import './ProfilePageStyle.scss';
import CircularJSON from 'circular-json';
import { DeckDTO } from '../entities/DeckDTO';

const ProfilePage = () => {

  const [newDeckTopic, setNewDeckTopic] = useState('');

  const [user, setUser] = useState<User>()

  const [avatar, setAvatar] = useState<string | undefined>(user?.avatarSrc)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)
      request.post<string>('/profile/changeAvatar', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
      ).then(response => setAvatar(response.data))
    }
  };


  useEffect(() => {
    request.get<User>("/profile").then(data => {
      setUser(data.data)
      setAvatar(data.data.avatarSrc)
    })
  }, [])

  const handleNewDeckTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeckTopic(event.target.value);
  };

  const handleNewDeckSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const newDeck:Deck ={
      id: user!.decks.length + 1,
      isPrivate: false,
      isSharedForAll: false,
      isSharedFromLink: false,
      topic: newDeckTopic,
      cards: new Array<AnkiCard>(),
      user: user,
      userId: user!.id,
    }

    const newDeckDTO:DeckDTO ={
      isPrivate: false,
      isSharedForAll: false,
      isSharedFromLink: false,
      topic: newDeckTopic,
      cards: new Array<AnkiCard>(),
    }


    const jsonString = CircularJSON.stringify(newDeckDTO);
    user!.decks?.push(newDeck);
    request.post("/profile/decks/new", jsonString);
    window.location.reload()
  }

  if (!user) return <div />
  else
    return (
      <>
        <Header />
        <div className='profile_page'>
          <div className='avatar_login'>


            <img src={"https://localhost:5001/" + avatar} alt="Avatar" className='profile_avatar'/>
            <div>
              <input type="file" onChange={handleFileChange} />
            </div>


            <h2 className="Text">{user.email}</h2>
          </div>

          <div className='profile_content'>
            <h3 className="Text">Мои колоды</h3>

            <h3 className="Text">Новая колода</h3>
            <form onSubmit={handleNewDeckSubmit} className='form'>
              <label htmlFor="newDeckTopic" className="Text">Тема:</label>
              <input type='text' id="newDeckTopic" name="newDeckTopic" className='row' value={newDeckTopic} onChange={handleNewDeckTopicChange} />
              <button type="submit" className='button'>Создать</button>
            </form>

            <div className='DeckList'>
              {user.decks.map((deck) => (
                <DeckComponent topic={deck.topic} id ={deck.id}/>
              ))}
            </div>

          </div>
        </div>
      </>
    )

};

export default ProfilePage;