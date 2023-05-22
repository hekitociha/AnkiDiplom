import { AnkiCard } from "./AnkiCard";

export interface User {
    id: string;
    email: string;
    avatarSrc: string;
    cards: AnkiCard[];
  }