import { User } from "./User";

export interface Deck {
  id: number;
  totalScore: number;
  score: number;
  percentOfRightAnswer : number;
  userId: string;
  user: User|undefined
}