"use server";

import { redirect } from "next/navigation";
import { complexHash } from "../helpers/hashTools";
import { userInputType } from "../helpers/interfaces";
import { validateEmail, validatePassword } from "../helpers/validators";
import { CheckUser } from "../helpers/user";

export const signup = async (state: unknown, event: FormData) => {
  const data = Object.fromEntries(event.entries()) as unknown as userInputType;
  const errors: string[] = [];
  const { email, password, name } = data;
  if (name.length < 3) errors.push("name");
  if (!validateEmail(email)) errors.push("email");
  if (!validatePassword(password)) errors.push("password");
  if (errors.length) return errors;
  data.id = complexHash(email + password + name);
  data.password = complexHash(password);
  data.phone = "";
  data.gender = "";
  data.jobTitle = "";
  data.decks = [];
  data.practiced = [];
  data.languages = [];
  data.avatar = "";
  data.progress = { state: "off", deck: "", tests: [] };
  const response = await fetch(`${process.env.SERVER_HOST}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ user: data }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await response.json();
  if (message == "user already exists 😡😡😡") return ["email"];
  redirect("/login");
};
export const login = async (state: unknown, event: FormData) => {
  const data = Object.fromEntries(event.entries()) as unknown as userInputType;
  const isExisted = await CheckUser(
    data.email,
    data.password,
    process.env.SERVER_HOST as string
  );
  if (!isExisted) return ["email", "password"];
  return ["done", data];
};
