'use strict';
const API_URL = NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
export const config = {
  cardsApiUrl: `${API_URL}/cards`,
  userApiUrl: `${API_URL}/users/me`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDIxMWQ0MDM2MWY1ZjFiMjA1ZTVlNTgiLCJpYXQiOjE2MTI3ODI5MTcsImV4cCI6MTY0NDMxODkxN30._OhqFnyB8_77_EEHVwRJNy7WDw8dIZmYNm5L4LSK8tE'
  },
  userId: 'cd3621b6a6461b94618c14ae',
  paths: {
    avatar: 'avatar',
    like: 'like'
  }
};
