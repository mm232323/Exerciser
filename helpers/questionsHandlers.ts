import { Card } from "./interfaces";
const WORD_TYPES = [
  "Noun",
  "Verb",
  "Pronoun",
  "Adjective",
  "Adverb",
  "Another",
];
function makeChooses(cards: Card[], main: Card, dir: string): string[] {
  const chooses = new Set<string>();
  const anothers = ["fox", "line", "car"];
  let remainedCards = cards.filter((card) => card.name !== main.name);

  const addChoice = (choice: string) => {
    if (chooses.size < 4) {
      chooses.add(choice);
    }
  };

  if (dir === "vocab-to-translation") {
    addChoice(main.translation);
    while (chooses.size < 4 && remainedCards.length > 0) {
      const cardIdx = Math.floor(Math.random() * remainedCards.length);
      const choosedCard = remainedCards[cardIdx];
      addChoice(choosedCard.translation);
      remainedCards = remainedCards.filter((_, idx) => idx !== cardIdx);
    }
  } else {
    addChoice(main.name);
    while (chooses.size < 4 && remainedCards.length > 0) {
      const cardIdx = Math.floor(Math.random() * remainedCards.length);
      const choosedCard = remainedCards[cardIdx];
      addChoice(choosedCard.name);
      remainedCards = remainedCards.filter((_, idx) => idx !== cardIdx);
    }
  }

  while (chooses.size < 4 && anothers.length > 0) {
    addChoice(anothers.pop()!);
  }

  return Array.from(chooses);
}

export function MeaningTest(card: Card) {
  const test = {
    name: "meaning",
    properties: {
      word: card.name,
      translation: card.translation,
      chars: "éèçàâïîæ",
    },
    answer: "",
    correctAnswer: card.name,
  };
  return test;
}

export function ChooseTest(choosenCard: Card, cards: Card[]) {
  const directions = ["vocab-to-translation", "translation-to-vocab"];
  const choosenDirection =
    directions[Math.floor(Math.random() * directions.length)];
  const test = {
    name: "choose",
    properties: {
      word: choosenCard.name,
      translation: choosenCard.translation,
      dir: choosenDirection,
      chooses: [] as string[],
    },
    answer: "",
    correctAnswer:
      choosenDirection == "vocab-to-translation"
        ? choosenCard.translation
        : choosenCard.name,
  };
  test.properties.chooses = makeChooses(
    cards,
    choosenCard,
    choosenDirection
  ) as string[];
  return test;
}

export function CompleteTest(card: Card) {
  const choosedSentence =
    card.sentences.split("|")[
      Math.floor(Math.random() * card.sentences.split("|").length)
    ];
  const targets = choosedSentence
    .split(" ")
    .filter((word) => word.toLowerCase() == card.name.toLowerCase())
    .join("-");
  const test = {
    name: "complete",
    properties: {
      word: card.name,
      translation: card.translation,
      sentence: choosedSentence,
      chars: "éèçàâïîæ",
    },
    answer: "",
    correctAnswer: targets,
  };
  return test;
}

export function CorrectionTest(card: Card, translations: string[]) {
  const testQTs = ["meaning", "type"];
  const choosedType = WORD_TYPES[Math.floor(Math.random() * WORD_TYPES.length)];
  const choosedTranslation =
    translations[Math.floor(Math.random() * translations.length)];
  const choosenQT = testQTs[Math.floor(Math.random() * testQTs.length)];
  let correctAnswer = "";
  if (
    choosenQT == "meaning" &&
    choosedTranslation.toLowerCase() == card.translation.toLowerCase()
  )
    correctAnswer = "True";
  else correctAnswer = "False";
  if (
    choosenQT == "type" &&
    choosedType.toLowerCase() == card.type.toLowerCase()
  )
    correctAnswer = "True";
  else correctAnswer = "False";
  const test = {
    name: "trueorfalse",
    properties: {
      word: card.name,
      translation: choosedTranslation,
      type: choosedType,
      testType: choosenQT,
    },
    answer: "",
    correctAnswer,
  };
  return test;
}

export function ConnectTest(cards: Card[]) {
  const choosed = [];
  let newCards = [...cards];
  while (choosed.length < 4 && newCards.length > 0) {
    const idx = Math.floor(Math.random() * newCards.length);
    choosed.push({
      name: newCards[idx].name,
      translation: newCards[idx].translation,
    });
    newCards = newCards.filter((card, i) => i !== idx);
  }
  const anothers = [
    { name: "delicious", translation: "very taste" },
    { name: "fox", translation: "dangerous animal" },
    { name: "taxi", translation: "a way of transport" },
  ];
  while (choosed.length < 4) {
    choosed.push(anothers.pop());
  }
  const correctAnswer = choosed
    .map((choose) => `${choose?.translation}-${choose?.name}`)
    .sort()
    .join("|");
  const test = {
    name: "connect",
    properties: {
      choosed,
    },
    answer: "",
    correctAnswer,
  };
  return test;
}
