export type meaningTest = {
  word: string;
  translation: string;
  chars: string;
};
export type chooseTest = {
  word: string;
  translation: string;
  dir: string;
  chooses: string[];
};
export type completeTest = {
  word: string;
  translation: string;
  sentence: string;
  chars: string;
};
export type correctionTest = {
  word: string;
  translation: string;
  type: string;
  testType: string;
};
export type connectTest = {
  choosed: { name: string; translation: string }[];
};
