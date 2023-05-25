import { Deck } from "./Deck";

export interface AnkiCard {
  id: number;
  question: string;
  answer: string;
  topic: string;
  isFavorite : boolean;
  deckId: number;
  deck: Deck|undefined
}