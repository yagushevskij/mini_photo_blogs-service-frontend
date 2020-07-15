'use strict';
const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';
export const config = {
  cardsApiUrl: `${API_URL}/cohort11/cards`,
  userApiUrl: `${API_URL}/cohort11/users/me`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': 'a3a931a8-e1c8-4a50-b648-c2aa722fd754'
  },
  userId: 'cd3621b6a6461b94618c14ae',
  paths: {
    avatar: 'avatar',
    like: 'like'
  }
};
