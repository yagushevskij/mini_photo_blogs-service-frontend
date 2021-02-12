const API_URL = NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
export const config = {
  userPath: 'user',
  reqApiParams: {
    signup: {
      url: `${API_URL}/signup/`,
      method: 'POST',
    },
    signin: {
      url: `${API_URL}/signin/`,
      method: 'POST',
    },
    addCard: {
      url: `${API_URL}/cards/`,
      method: 'POST',
    },
    changeUserInfo: {
      url: `${API_URL}/users/me/`,
      method: 'PATCH',
    },
    changeAvatar: {
      url: `${API_URL}/users/me/avatar/`,
      method: 'PATCH',
    },
    addLike: {
      url: `${API_URL}/cards/like/`,
      method: 'PUT',
    },
    removeLike: {
      url: `${API_URL}/cards/like/`,
      method: 'DELETE',
    },
    deleteCard: {
      url: `${API_URL}/cards/`,
      method: 'DELETE',
    },
    getUserInfo: {
      url: `${API_URL}/users/`,
      method: 'GET',
    },
    getUserCards: {
      url: `${API_URL}/cards/user/`,
      method: 'GET',
    },
  },
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  },
  user: {
    id: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
  },
  text: {
    inputClassName: '.popup__input',
    userNotFound: 'Пользователь не найден',
    validationMessages: {
      tooShort: 'Минимум символов:',
      tooLong: 'Максимум символов',
      required: 'Это обязательное поле',
      requiredEmail: 'Здесь должен быть email',
      requiredLink: 'Здесь должна быть ссылка',
    }
  }
};
