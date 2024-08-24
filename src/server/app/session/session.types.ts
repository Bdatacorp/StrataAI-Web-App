import { State } from "../state/state.types";
import { User } from "../users/users.types";

export interface InitSessionDto {
  stateId: string;
}

export type Session = {
  user: User;
  state: State;
  createdAt: string;
  updatedAt: string;
};
