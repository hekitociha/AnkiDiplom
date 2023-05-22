import { User } from "./User";

export interface AnkiCard {
  Id: number;
  FrontSide: string;
  BackSide: string;
  Topic: string;
  userId: string;
  user: User|undefined
}