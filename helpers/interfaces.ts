import {
  chooseTest,
  completeTest,
  connectTest,
  correctionTest,
  meaningTest,
} from "./testTypes";

export interface Card {
  name: string;
  translation: string;
  type: string;
  sentences: string;
  deck: string;
}
export interface Deck {
  name: string;
  color: string;
  lang: string;
  cards: Card[];
}
export interface userInputType {
  name: string;
  email: string;
  password: string;
  id: string;
  gender: string;
  jobTitle: string;
  phone: string;
  decks: Deck[];
  practiced: practicedType[];
  languages: { name: string; score: number }[];
  avatar: string;
  progress: { state: string; deck: string; tests: object[] };
}
export interface personalInpType {
  gender: string;
  jobTitle: string;
  phone: string;
}

export interface practicedType {
  deck: string;
  score: number;
  maxScore: number;
  finalScore: number;
  tests: object[];
  state: string;
  language: string;
}
export interface TestType {
  name: string;
  properties:
    | meaningTest
    | chooseTest
    | connectTest
    | completeTest
    | correctionTest;
  answer: string;
}
