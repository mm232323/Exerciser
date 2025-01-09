export async function CheckUser(
  email: string,
  password: string,
  serverUrl: string
) {
  const response = await fetch(`${serverUrl}/auth/check-user`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { isExisted } = await response.json();
  return isExisted;
}
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
