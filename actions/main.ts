"use server";

import { getServerSession } from "next-auth";
import { Card, Deck, personalInpType } from "../helpers/interfaces";
import cloudinary from "cloudinary";

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