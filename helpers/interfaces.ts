export interface Card {
  name: string;
  translation: string;
  type: string;
  sentences: string[];
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
}
export interface personalInpType {
  gender: string;
  jobTitle: string;
  phone: string;
}

export interface practicedType {
  deckName: string;
  practiced: number;
}
