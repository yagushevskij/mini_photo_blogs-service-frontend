const API_URL = process.env.NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
const MAIN_URL = process.env.NODE_ENV === 'production' ? 'https://mesto.turbomegapro.ru' : 'http://localhost:8080';
const localJWT = `Bearer ${localStorage.getItem('token')}`;
const config = {
  userPageFeature: {
    // url() { return process.env.NODE_ENV === 'production' ? `${MAIN_URL}/${this.path}/` : `${MAIN_URL}?${this.path}=` }, //Фишка будет добавлена позже
    url() { return `${MAIN_URL}?${this.path}=` },
    path: 'user',
    urlParams: window.location.search,
  },
  reqApiParams: {
    signup: {
      url: `${API_URL}/signup/`,
      method: 'POST',
      headers: {
        authorization: localJWT,
      },
    },
    signin: {
      url: `${API_URL}/signin/`,
      method: 'POST',
      headers: {
        authorization: localJWT,
      },
    },
    addCard: {
      url: `${API_URL}/cards/`,
      method: 'POST',
      headers: {
        authorization: localJWT,
      },
    },
    changeUserInfo: {
      url: `${API_URL}/users/me/`,
      method: 'PATCH',
      headers: {
        authorization: localJWT,
      },
    },
    changeAvatar: {
      url: `${API_URL}/users/me/avatar/`,
      method: 'PATCH',
      headers: {
        authorization: localJWT,
      },
    },
    addLike: {
      url: `${API_URL}/cards/like/`,
      method: 'PUT',
      headers: {
        authorization: localJWT,
      },
    },
    removeLike: {
      url: `${API_URL}/cards/like/`,
      method: 'DELETE',
      headers: {
        authorization: localJWT,
      },
    },
    deleteCard: {
      url: `${API_URL}/cards/`,
      method: 'DELETE',
      headers: {
        authorization: localJWT,
      },
    },
    getUserInfo: {
      url: `${API_URL}/users/`,
      method: 'GET',
      headers: {
        authorization: localJWT,
      },
    },
    getUserCards: {
      url: `${API_URL}/cards/user/`,
      method: 'GET',
      headers: {
        authorization: localJWT,
      },
    },
    checkUserExist: {
      url: `${API_URL}/users/me/`,
      method: 'GET',
      headers: {
        authorization: localJWT,
      },
    },
    upload: {
      url: `${API_URL}/upload/`,
      method: 'POST',
      headers: {
        authorization: localJWT,
      },
    },
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
      groupRequired: 'Заполните хотя бы одно поле',
      requiredPicture: 'Допустимые форматы:',
    },
  },
  fileExtensions: {
    picture: ['.jpg', 'jpeg', '.png', '.gif'],
  },
};
export default config;
