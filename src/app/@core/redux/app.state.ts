import { User } from '../models/user.model';

export interface AppState {
  login1: Readonly<User>;
  history:Readonly<any>;
}
