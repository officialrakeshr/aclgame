import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../models/user.model';

export const selectLoginUser = createFeatureSelector<Readonly<User>>('login');

export const selectUser = createSelector(selectLoginUser, (user) => {
  return user;
});
