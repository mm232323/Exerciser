export function validateEmail(email: string) {
  const re: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
export function validatePassword(password: string) {
  const re: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
}
