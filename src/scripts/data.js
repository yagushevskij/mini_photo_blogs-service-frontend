'use strict';
const API_URL = NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
export const config = {
  userPath: 'user',
  cardsApiUrl: `${API_URL}/cards`,
  userApiUrl: `${API_URL}/users/me`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDIyOGJjMTQwZTRmMDM5YTA2NmExM2UiLCJpYXQiOjE2MTI4NzY3ODcsImV4cCI6MTY0NDQxMjc4N30.RfnRACg3gTklYBGggKxmn3DFS3F2r_wdDpecrk7aaiU'
  },
  userId: 'cd3621b6a6461b94618c14ae',
  paths: {
    avatar: 'avatar',
    like: 'like'
  }
};
