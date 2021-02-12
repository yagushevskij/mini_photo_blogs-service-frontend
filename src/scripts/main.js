import '../pages/index.css';
import {
  signinButton, signupButton, signupPopupTemplate, signinPopupTemplate,
}
  from './constants/selectors';

import { config } from './data';
import { Api } from './Api';
import { Loader } from './Loader';
import { UserInfo } from './UserInfo';
import { Card } from './Card';
import { CardList } from './CardList';
// import {Popup} from './Popup.js';
// import {FormPopup} from './FormPopup.js';
import { AvatarPopup } from './AvatarPopup';
import { CardPopup } from './CardPopup';
import { ProfilePopup } from './ProfilePopup';
import { ImagePopup } from './ImagePopup';
import { SignupPopup } from './SignupPopup';
import { SigninPopup } from './SigninPopup';
import { FormValidator } from './FormValidator';
import { Header } from './Header';
import { User } from './User';

(function () {
  const cardsContainer = document.querySelector('.places-list');
  const popupContainer = document.querySelector('.popup');
  const templateCard = document.querySelector('#card').content;
  const cardsLoader = document.querySelector('#cards-loader');
  const profileContainer = document.querySelector('.user-info');

  const createFormValidator = (...args) => new FormValidator(...args, config.text);

  const header = new Header();
  const api = new Api(config);
  const loader = new Loader();

  const requestCardLikeToApi = (cardId) => api.sendRequest({
    method: config.reqApiParams.addLike.method,
    url: config.reqApiParams.addLike.url + cardId,
  });
  const requestCardDislikeToApi = (cardId) => api.sendRequest({
    method: config.reqApiParams.removeLike.method,
    url: config.reqApiParams.removeLike.url + cardId,
  });
  const requestCardRemoveToApi = (cardId) => api.sendRequest({
    method: config.reqApiParams.deleteCard.method,
    url: config.reqApiParams.deleteCard.url + cardId,
  });
  const requestUserExistToApi = () => api.sendRequest(config.reqApiParams.checkUserExist);
  const sendCardToApi = (...args) => api.sendRequest(config.reqApiParams.addCard, ...args);
  const sendRegDataToApi = (...args) => api.sendRequest(config.reqApiParams.signup, ...args);
  const sendAuthDataToApi = (...args) => api.sendRequest(config.reqApiParams.signin, ...args);
  const sendAvatarDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeAvatar,
    ...args);
  const sendUserDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeUserInfo,
    ...args);
  const createCard = (obj) => new Card(imagePopup, templateCard, requestCardLikeToApi,
    requestCardDislikeToApi, requestCardRemoveToApi, user.data._id).create(obj);

  const cardList = new CardList(cardsContainer, createCard);
  const { addCard } = cardList;

  const user = new User(requestUserExistToApi);
  const userInfo = new UserInfo(profileContainer, ['name', 'about'], ['avatar']);
  const imagePopup = new ImagePopup(document.querySelector('#image-popup'), popupContainer);
  const profilePopup = new ProfilePopup(document.querySelector('#profile-popup'), popupContainer, userInfo, sendUserDataToApi);
  const cardPopup = new CardPopup(document.querySelector('#place-popup'), popupContainer, addCard, sendCardToApi);
  const avatarPopup = new AvatarPopup(document.querySelector('#avatar-popup'), popupContainer, userInfo, sendAvatarDataToApi);
  const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer, sendRegDataToApi);
  const signinPopup = new SigninPopup(signinPopupTemplate, popupContainer, sendAuthDataToApi);
  document.querySelector('.user-info__button').addEventListener('click', () => {
    cardPopup.create(createFormValidator);
    cardPopup.open();
  });
  document.querySelector('.user-info__edit-button').addEventListener('click', () => {
    profilePopup.create(createFormValidator);
    profilePopup.getInformation();
    profilePopup.open();
  });
  document.querySelector('.user-info__avatar').addEventListener('click', () => {
    avatarPopup.create(createFormValidator);
    avatarPopup.open();
  });
  signupButton.addEventListener('click', () => {
    signupPopup.create(createFormValidator);
    signupPopup.open();
  });
  signinButton.addEventListener('click', () => {
    signinPopup.create(createFormValidator);
    signinPopup.open();
  });

  user.updateUserData();
  header.render();
  const urlParams = window.location.search;
  const regExp = new RegExp(`\\?${config.userPath}\\=[a-zA-Z0-9]+`);
  if (regExp.test(urlParams)) {
    const username = urlParams.replace(`?${config.userPath}=`, '');
    loader.changeStatus(cardsLoader, true);
    api.sendRequest({
      url: config.reqApiParams.getUserInfo.url + username,
      method: config.reqApiParams.getUserInfo.methhod,
    })
      .then((res) => {
        userInfo.setUserInfo(res);
        userInfo.updateUserInfo();
        return res;
      })
      .then((res) => {
        api.sendRequest({
          url: config.reqApiParams.getUserCards.url + res._id,
          method: config.reqApiParams.getUserCards.methhod,
        })
          .then((cards) => {
            cardList.render(cards);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => loader.changeStatus(cardsLoader, false));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('Главная');
  }
}());

/*
  Резюме по работе:
  У вас получилась хорошая работа, вы молодец! Над оставшимися пунктами из "Можно лучше" было бы здорово тоже поработать.

  Что понравилось:
  - код разбит на множество классов;
  - выполнены дополнительные задания;
  - в классе Api присутствуют базовые методы, которые кастомизируются через параметры;
  - используется единый конфиг.

  Что можно улучшить:
  - в классе Api не записывать переменные в this, когда можно обойтись обычной переменной;
  - передавать event в функцию-обработчик;
  - убрать запись в this UserInfo.setUserInfo;
  - Api._checkResponse использовать без дополнительной обёртки;
  - пересмотреть подход к передаче зависимостей в классы, в некоторых местах оптимальней
  вместо передачи нескольких функций/экземпляров классов использовать коллбек функцию,
  которую вызывать при каком либо событии, например, нажата кнопка "сохранить",
  а в вызывающем коде в передаваемом коллбэке уже реализовывать логику, которая должна быть выполнена при этом событии.

  Успехов в дальнейшем обучении!
 */
