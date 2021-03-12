const API_URL = process.env.NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
const MAIN_URL = process.env.NODE_ENV === 'production' ? 'https://mesto.turbomegapro.ru' : 'http://localhost:8080';
const config = {
  gallery: {
    gapSize: 10, // Размер горизонтального и вертикального отступа между строками и столбцами, px
    minFileSize: 150, // Размер минимальной стороны для фото с наименьшим рейтингом, px.
    maxFileSize: 400, // Размер минимальной стороны для фото с наибольшим рейтингом, px.
    cellSize: 100, // Размер сторон grid ячейки, px. Рекомендуется использовать
    // значение равное minFileSize
  },
  userPageFeature: {
    getUrlParams() {
      return process.env.NODE_ENV === 'production'
        ? window.location.pathname : window.location.search;
    },
    getUserPageUrlRegExp() {
      return process.env.NODE_ENV === 'production'
        ? `\\${config.userPageFeature.path}\\/[a-zA-Z0-9]+`
        : `\\?${config.userPageFeature.path}\\=[a-zA-Z0-9]+`;
    },
    getExtractNameRegExp() {
      return process.env.NODE_ENV === 'production'
        ? `\\${config.userPageFeature.path}\\/(.*)$`
        : `\\?${config.userPageFeature.path}\\=(.*)$`;
    },
    path: 'user',
  },
  reqApiParams: {
    signup: {
      url: `${API_URL}/signup/`,
      method: 'POST',
    },
    signin: {
      url: `${API_URL}/signin/`,
      method: 'POST',
    },
    signout: {
      url: `${API_URL}/signout/`,
      method: 'get',
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
      headers: {
        'Content-Type': 'application/json',
      },
    },
    removeLike: {
      url: `${API_URL}/cards/like/`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    deleteCard: {
      url: `${API_URL}/cards/`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    getUserInfo: {
      url: `${API_URL}/users/username/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    getUserCards: {
      url: `${API_URL}/cards/user/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    getAllUsersCards: {
      url: `${API_URL}/cards/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    checkUserExist: {
      url: `${API_URL}/users/me/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    upload: {
      url: `${API_URL}/upload/card`,
      method: 'POST',
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
export { config, MAIN_URL };
