import generateRandomToken from "./randomToken";

export enum UserSessionMethods {
  default = "default",
  generate = "generate",
}

export default function userSession(
  method?: UserSessionMethods,
  state?: string
) {
  let returnVal: boolean | string = false;
  switch (method) {
    case UserSessionMethods.generate:
      if (!state) break;
      returnVal = newSession(state);
      break;
    default:
      returnVal = defaultSessionMethod();
  }

  return returnVal;
}

function defaultSessionMethod() {
  const existingToken = localStorage.getItem("session_id");
  if (existingToken) {
    return existingToken;
  }

  const token = generateRandomToken(16);
  localStorage.setItem("session_id", token);

  return token;
}

function newSession(state: string) {
  const token = generateRandomToken(16);
  localStorage.setItem("session_id", token);
  localStorage.setItem("state", state);
  return token;
}
