import { AnkiCard } from "./AnkiCard";
import { User } from "./User";

export interface Deck {
  id: number;
  isPrivate: boolean;
  isSharedForAll: boolean;
  isSharedFromLink : boolean;
  topic: string; 
  cards : AnkiCard[]
  userId: string;
  user: User|undefined;
}