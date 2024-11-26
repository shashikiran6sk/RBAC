import { selector } from 'recoil';
import { userState, roleState } from './atoms';

export const activeUsersSelector = selector({
  key: 'activeUsersSelector',
  get: ({ get }) => get(userState).filter(user => user.status === 'Active'),
});
