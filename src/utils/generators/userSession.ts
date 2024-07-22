import generateRandomToken from "./randomToken";

export default function userSession(): string {
  const existingToken = localStorage.getItem("session_id");
  if (existingToken) {
    return existingToken;
  }

  const token = generateRandomToken(16);

  localStorage.setItem("session_id", token);

  return token;
}
