import { useEffect, useState } from "react"
import { Deck } from "../entities/Deck"
import { request } from "../Services/request"
import Header from "../Components/Header";
import { DeckComponent } from "../shared/ui/molecules/Deck/Deck";
import Cookie from "js-cookie";
import ProfilePage from "./ProfilePage";
import { SharedDeckComponent } from "../shared/ui/molecules/Deck/SharedDeck";

export const SharedDecksPage = ()=>{

    const [decks, setDecks] = useState<Array<Deck>>()  

    useEffect(() => {
        request.get<Array<Deck>>("/sharedDecks").then(data => {
            setDecks(data.data)
        })
      }, [])

      if (!decks) return <div />
      else
        return (
          <><Header />
          <h2 className="Text">Колоды, которыми поделились пользователи</h2>
                <div className='DeckList'>
                  {decks.map((deck) => (
                    <SharedDeckComponent topic={deck.topic}  id ={deck.id} />
                  ))}
                </div>
    
          </>
        )
    };
    
    export default SharedDecksPage;

