"use server";

import { getServerSession } from "next-auth";
import {
  Card,
  Deck,
  personalInpType,
  userInputType,
} from "../helpers/interfaces";
import cloudinary from "cloudinary";
import {
  ChooseTest,
  CompleteTest,
  ConnectTest,
  CorrectionTest,
  MeaningTest,
} from "../helpers/questionsHandlers";
import { redirect } from "next/navigation";

export async function getUser(email: string) {
  const response = await fetch(`${process.env.SERVER_HOST}/auth/get-user`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  return user;
}

export async function editPersonal(state: unknown, event: FormData) {
  const data = Object.fromEntries(
    event.entries()
  ) as unknown as personalInpType;
  const session = await getServerSession();
  const response = await fetch(
    `${process.env.SERVER_HOST}/user/set-personals`,
    {
      method: "POST",
      body: JSON.stringify({ ...data, userEmail: session?.user?.email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { message } = await response.json();
  console.log(message);
  return ["done"];
}

export async function addAvatar(state: unknown, event: FormData) {
  const data = Object.fromEntries(event.entries()) as unknown as {
    avatar: File;
    email: string;
  };
  const email = data.email;
  let avatarUrl = "";
  const avatar = data.avatar as File;
  const ArrayBuffer = await avatar.arrayBuffer();
  const buffer = new Uint8Array(ArrayBuffer);
  await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ folder: "exerciser-avatars" }, async (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        avatarUrl = result?.secure_url as string;
        const response = await fetch(
          `${process.env.SERVER_HOST}/user/set-avatar`,
          {
            method: "POST",
            body: JSON.stringify({ email, avatar: result?.secure_url }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { message } = await response.json();
        console.log(message);
        resolve(result);
      })
      .end(buffer);
  });
  return avatarUrl;
}

export async function PostDeck(state: unknown, event: FormData) {
  const { name, lang, color } = Object.fromEntries(
    event.entries()
  ) as unknown as Deck;
  const errors = [];
  if (!name) errors.push("name");
  if (!lang) errors.push("lang");
  if (errors.length > 0) return errors;
  const session = await getServerSession();
  const response = await fetch(`${process.env.SERVER_HOST}/user/create-deck`, {
    method: "POST",
    body: JSON.stringify({
      deck: { name, lang, color, cards: [] },
      email: session?.user?.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await response.json();
  console.log(message);
  return ["done"];
}
export async function PostVocab(state: unknown, event: FormData) {
  const { deck, name, type, translation, sentences } = Object.fromEntries(
    event.entries()
  ) as unknown as Card;
  const errors = [];
  if (!name) errors.push("name");
  if (!translation) errors.push("translation");
  if (type == "Choose Type") errors.push("type");
  if (deck == "Choose Deck") errors.push("deck");
  if (errors.length > 0) return errors;
  const session = await getServerSession();
  const response = await fetch(`${process.env.SERVER_HOST}/user/create-card`, {
    method: "POST",
    body: JSON.stringify({
      card: { deck, name, type, translation, sentences },
      email: session?.user?.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await response.json();
  console.log(message);
  return ["done"];
}

export async function deleteDeck(deckName: string, email: string) {
  const response = await fetch(`${process.env.SERVER_HOST}/user/delete-deck`, {
    method: "POST",
    body: JSON.stringify({ deckName, email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await response.json();
  console.log(message);
  return ["done"];
}

export async function prepareQuestions(deckName: string) {
  const session = await getServerSession();
  const response = await fetch(`${process.env.SERVER_HOST}/user/get-deck`, {
    method: "POST",
    body: JSON.stringify({ deckName, email: session?.user?.email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { deck }: { deck: Deck } = await response.json();
  const tests = new Array(deck.cards.length * 5).fill({
    name: "",
    properties: {},
  });
  const types = ["meaning", "choose", "complete", "trueorfalse", "connect"];
  for (let i = 0; i < tests.length; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const card = deck.cards[Math.floor(Math.random() * deck.cards.length)];
    if (type == "meaning") {
      const test = MeaningTest(card);
      tests[i] = test;
    } else if (type == "choose") {
      const test = ChooseTest(card, deck.cards);
      tests[i] = test;
    } else if (type == "complete") {
      if (card.sentences.length == 0) {
        i -= 1;
        continue;
      }
      const test = CompleteTest(card);
      tests[i] = test;
    } else if (type == "trueorfalse") {
      const test = CorrectionTest(
        card,
        deck.cards.map((card) => card.translation)
      );
      tests[i] = test;
    } else {
      const test = ConnectTest(deck.cards);
      tests[i] = test;
    }
  }
  const response2 = await fetch(`${process.env.SERVER_HOST}/user/set-tests`, {
    method: "POST",
    body: JSON.stringify({
      email: session?.user?.email,
      tests,
      deck: deckName,
      state: "on",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await response2.json();
  console.log(message);
  redirect("/practice/quiz");
}

export async function setAnswer(testIdx: number, answer: string, deck: string) {
  const session = await getServerSession();
  const response = await fetch(`${process.env.SERVER_HOST}/user/set-answer`, {
    method: "POST",
    body: JSON.stringify({
      testIdx,
      answer,
      email: session?.user?.email,
      deck,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await response.json();
  console.log(message);
}

export async function setPracticedTest() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const user = (await getUser(session?.user?.email as string)) as userInputType;
  const { tests, deck } = user.progress;
  const language = user.decks.filter((d) => d.name == deck)[0].lang;
  const MAX_SCORE = tests.length;
  let points = 0;
  for (let i = 0; i < tests.length; i++) {
    if (
      (tests[i] as { answer: string }).answer.toLowerCase() ==
      (tests[i] as { correctAnswer: string }).correctAnswer.toLowerCase()
    )
      points++;
  }
  const finalScore = (points / MAX_SCORE) * 100;
  const response = await fetch(
    `${process.env.SERVER_HOST}/user/set-practiced`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        language,
        score: points,
        maxScore: MAX_SCORE,
        finalScore,
        deck,
        tests,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { message } = await response.json();
  console.log(message);
}
export async function deActivatePractice(email: string) {
  const response = await fetch(
    `${process.env.SERVER_HOST}/de-activate-practice`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "appllication/json",
      },
    }
  );
  const { message } = await response.json();
  console.log(message);
}
