import '../pages/index.css';
import {
  cardsContainer, popupContainer, templateCard, profileContainer, cardsLoader,
  signinButton, signupButton, signupPopupTemplate, signinPopupTemplate,
}
  from './constants/selectors';

import config from './data';
import { Api } from './Api';
import { Loader } from './Loader';
import { UserInfo } from './UserInfo';
import { Card } from './Card';
import { CardList } from './CardList';
import { AvatarPopup } from './AvatarPopup';
import { CardPopup } from './CardPopup';
import { ProfilePopup } from './ProfilePopup';
import { ImagePopup } from './ImagePopup';
import { SignupPopup } from './SignupPopup';
import { SigninPopup } from './SigninPopup';
import { FormValidator } from './FormValidator';
import { Header } from './Header';
import { User } from './User';

const api = new Api(config);
api.sendRequest(config.reqApiParams.checkUserExist)
  .then((userData) => {
    // Колбэки
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
    const sendCardToApi = (...args) => api.sendRequest(config.reqApiParams.addCard, ...args);
    const sendRegDataToApi = (...args) => api.sendRequest(config.reqApiParams.signup, ...args);
    const sendAuthDataToApi = (...args) => api.sendRequest(config.reqApiParams.signin, ...args);
    const sendAvatarDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeAvatar,
      ...args);
    const sendUserDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeUserInfo,
      ...args);
    const createCard = (obj) => card.create(obj);
    const createFormValidator = (...args) => new FormValidator(...args, config.text);

    const user = new User();
    const header = new Header();
    const loader = new Loader();
    const cardList = new CardList(cardsContainer, createCard);
    const userInfo = new UserInfo(profileContainer, ['name', 'about'], ['avatar']);
    const imagePopup = new ImagePopup(document.querySelector('#image-popup'), popupContainer);
    const profilePopup = new ProfilePopup(document.querySelector('#profile-popup'), popupContainer, userInfo, sendUserDataToApi);
    const card = new Card(imagePopup, templateCard, requestCardLikeToApi,
      requestCardDislikeToApi, requestCardRemoveToApi, userData._id);
    const cardPopup = new CardPopup(document.querySelector('#place-popup'), popupContainer, cardList.addCard, sendCardToApi);
    const avatarPopup = new AvatarPopup(document.querySelector('#avatar-popup'), popupContainer, userInfo, sendAvatarDataToApi);
    const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer, sendRegDataToApi);
    const signinPopup = new SigninPopup(signinPopupTemplate, popupContainer, sendAuthDataToApi);

    header.render(userData);
    const regExp = new RegExp(`\\?${config.userPageFeature.path}\\=[a-zA-Z0-9]+`);
    if (regExp.test(config.userPageFeature.urlParams)) {
      const username = config.userPageFeature.urlParams.replace(`?${config.userPageFeature.path}=`, '');
      loader.changeStatus(cardsLoader, true);
      api.sendRequest({
        url: config.reqApiParams.getUserInfo.url + username,
        method: config.reqApiParams.getUserInfo.method,
      })
        .then((res) => {
          userInfo.setUserInfo(res);
          userInfo.updateUserInfo();
          return res;
        })
        .then((res) => {
          api.sendRequest({
            url: config.reqApiParams.getUserCards.url + res._id,
            method: config.reqApiParams.getUserCards.method,
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
  });
