import { AnkiCard } from "./AnkiCard";

export interface DeckDTO {
  isPrivate: boolean;
  isSharedForAll: boolean;
  isSharedFromLink : boolean;
  topic: string; 
  cards : AnkiCard[]
}