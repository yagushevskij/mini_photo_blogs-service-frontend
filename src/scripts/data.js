'use strict';
const API_URL = NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
export const config = {
  userPath: 'user',
  cardsApiUrl: `${API_URL}/cards/`,
  userCardsApiUrl: `${API_URL}/cards/user/`,
  usersApiUrl: `${API_URL}/users/`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDIzYWQ4NjMyMDU2NzIwMTBmOThjMDciLCJpYXQiOjE2MTI5NTA5MjEsImV4cCI6MTY0NDQ4NjkyMX0.oheXxhMe55Acnhyegt37Z--DMosZ-8R-dqhFwI19TCo'
  },
  userId: 'cd3621b6a6461b94618c14ae',
  paths: {
    avatar: 'avatar',
    like: 'like',
    
  },
  text: {
    userNotFound: 'Пользователь не найден',
  }
};
