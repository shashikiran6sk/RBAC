import { atom } from 'recoil';
import users from '../data/users.json';
import roles from '../data/roles.json';

export const userState = atom({
  key: 'userState',
  default: users, // Load initial data from users.json
});

export const roleState = atom({
  key: 'roleState',
  default: roles, // Load initial data from roles.json
});
