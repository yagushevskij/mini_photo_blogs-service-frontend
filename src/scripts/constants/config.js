const API_URL = process.env.NODE_ENV === 'production' ? 'https://mesto-api.turbomegapro.ru' : 'http://localhost:3001';
const MAIN_URL = process.env.NODE_ENV === 'production' ? 'https://mesto.turbomegapro.ru' : 'http://localhost:8080';
const config = {
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
  userCards: {
    title: {
      authorized: {
        regular(count) { return `У вас ${count} фото`; },
        empty: 'У вас нет загруженных фото',
      },
      unAuthorized: {
        regular(count, name) { return `У пользователя ${name} загружно ${count} фото`; },
        empty(name) { return `Пользователь ${name} еще ничего не загрузил`; },
      },
      srvErr: 'Ошибка сервера при загрузке',
    },
    settings: {
      itemsOnPage: 10,
      sortBy: 'date',
      loadBy: 'scroll',
    },
    card: {
      errThumbUrl: 'http://placehold.it/200x400',
      errLoadMsg(url) { return `Невозможно загрузить картинку по адресу: ${url}`; },
    },
    button: {
      text: 'Показать еще',
    },
  },
  topCards: {
    title: {
      regular(count) { return `Топ ${count} фото`; },
      empty: 'Загруженных фото нет',
      srvErr: 'Ошибка сервера при загрузке',
    },
    settings: {
      itemsOnPage: 25,
      total: 60,
      sortBy: 'likes',
      loadBy: 'button',
    },
    card: {
      errThumbUrl: 'http://placehold.it/200x400',
      errLoadMsg(url) { return `Невозможно загрузить картинку по адресу: ${url}`; },
    },
    gallery: {
      minFileSize: 150, // Размер минимальной стороны для фото с наименьшим рейтингом, px.
      maxFileSize: 400, // Размер минимальной стороны для фото с наибольшим рейтингом, px.
      cellSize: 150, // Размер сторон grid ячейки, px. Рекомендуется использовать
      // значение равное minFileSize
    },
    button: {
      text: 'Показать еще',
    },
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
    validationMessages: {
      tooShort: 'Минимум символов:',
      tooLong: 'Максимум символов',
      required: 'Это обязательное поле',
      requiredEmail: 'Здесь должен быть email',
      requiredLink: 'Здесь должна быть ссылка',
      groupRequired: 'Заполните хотя бы одно поле',
      requiredPicture: 'Допустимые форматы:',
    },
    errors: {
      apiErr: 'Ошибка получения данных с API. Сообщите нам и мы всё отремонтируем :)',
      srvErr: 'Ошибка сервера',
      srvConnectErr: 'Ошибка подключения к серверу',
    },
  },
  fileExtensions: {
    picture: ['.jpg', 'jpeg', '.png', '.gif'],
  },
  avatar: {
    errThumbUrl: 'http://placehold.it/100x100',
    showErrLoadMsg(url) { return `Невозможно загрузить картинку по адресу: ${url}`; },
  },
  userMenu: {
    errThumbUrl: 'http://placehold.it/60x60',
    showErrLoadMsg(url) { return `Невозможно загрузить картинку по адресу: ${url}`; },
  },
  popups: {
    imagePopup: {
      errThumbUrl: 'http://placehold.it/640x480',
      showErrLoadMsg(url) { return `Невозможно загрузить картинку по адресу: ${url}`; },
    },
    signinPopup: {
      button: {
        text: 'Войти',
        loaderText: 'Загрузка...',
      },
    },
    signupPopup: {
      button: {
        text: 'Зарегистрироваться',
        loaderText: 'Загрузка...',
      },
    },
    profilePopup: {
      button: {
        text: 'Изменить',
        loaderText: 'Загрузка...',
      },
    },
    cardPopup: {
      button: {
        text: '+',
        loaderText: 'Загрузка...',
      },
    },
    avatarPopup: {
      button: {
        text: 'Изменить',
        loaderText: 'Загрузка...',
      },
    },
  },
};
export { config, MAIN_URL };
