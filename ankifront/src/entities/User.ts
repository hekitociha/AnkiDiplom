import { Deck } from "./Deck";

export interface User {
    id: string;
    email: string;
    avatarSrc: string;
    decks: Deck[];
  }