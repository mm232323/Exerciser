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
