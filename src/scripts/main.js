import '../pages/index.css';
import {
  cardsContainer, popupContainer, cardTemplate, profileContainer, cardsLoader,
  signupPopupTemplate, signinPopupTemplate, imagePopupTemplate,
  profilePopupTemplate, cardPopupTemplate, avatarPopupTemplate, userBlockContainer,
  userMenuTemplate, userLinksTemplate, addCardBtn, editProfileBtn, updateAvatarBtn,
  profileTemplate,
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
import { UserMenu } from './UserMenu';
import { User } from './User';

// Колбэки
const openPopup = (popup, ...args) => popup.open(args);
const openImagePopup = (...args) => openPopup(imagePopup, ...args);

const sendApiRequest = (...args) => api.sendRequest(...args);
const addLikeRequest = (cardId) => sendApiRequest({
  method: config.reqApiParams.addLike.method,
  url: config.reqApiParams.addLike.url + cardId,
});
const removeLikeRequest = (cardId) => sendApiRequest({
  method: config.reqApiParams.removeLike.method,
  url: config.reqApiParams.addLike.url + cardId,
});
const removeCardRequest = (cardId) => sendApiRequest({
  method: config.reqApiParams.deleteCard.method,
  url: config.reqApiParams.deleteCard.url + cardId,
});

const createCard = (...args) => new Card(openImagePopup, cardTemplate, addLikeRequest,
  removeLikeRequest, removeCardRequest).create(user.data._id, ...args);

const api = new Api(config.headers);
const user = new User();
const header = new Header(userBlockContainer);
const userInfo = new UserInfo(profileContainer, profileTemplate, ['name', 'about'], ['avatar']);
const imagePopup = new ImagePopup(imagePopupTemplate, popupContainer);


const sendCardToApi = (...args) => api.sendRequest(config.reqApiParams.addCard, ...args);
const sendRegDataToApi = (...args) => api.sendRequest(config.reqApiParams.signup, ...args);
const sendAuthDataToApi = (...args) => api.sendRequest(config.reqApiParams.signin, ...args);
const sendAvatarDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeAvatar,
  ...args);
const sendUserDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeUserInfo,
  ...args);

const checkUserExist = sendApiRequest(config.reqApiParams.checkUserExist);
checkUserExist
  .then((res) => {
    user.setData(res);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    const createFormValidator = (...args) => new FormValidator(...args, config.text);
    const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer, createFormValidator,
      sendRegDataToApi, config.userPageFeature.url);
    const signinPopup = new SigninPopup(signinPopupTemplate, popupContainer, createFormValidator,
      sendAuthDataToApi, config.userPageFeature.url);
    const loader = new Loader();
    const userMenu = new UserMenu(userMenuTemplate, userLinksTemplate,
      signupPopup.open, signinPopup.open).create(user.data);
    const cardList = new CardList(cardsContainer, createCard);
    const profilePopup = new ProfilePopup(profilePopupTemplate, popupContainer, createFormValidator,
      sendUserDataToApi, userInfo);
    const cardPopup = new CardPopup(cardPopupTemplate, popupContainer, createFormValidator,
      sendCardToApi, cardList.addCard);
    const avatarPopup = new AvatarPopup(avatarPopupTemplate, popupContainer, createFormValidator,
      sendAvatarDataToApi, userInfo);
    header.render(userMenu);

    const regExp = new RegExp(`\\?${config.userPageFeature.path}\\=[a-zA-Z0-9]+`);
    if (regExp.test(config.userPageFeature.urlParams)) {
      const username = config.userPageFeature.urlParams.replace(`?${config.userPageFeature.path}=`, '');
      loader.changeStatus(cardsLoader, true);
      api.sendRequest({
        url: config.reqApiParams.getUserInfo.url + username,
        method: config.reqApiParams.getUserInfo.method,
      })
        .then((res) => {
          userInfo.render(user.data, res);
          userInfo.setUserInfo();
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
            .catch((err) => console.log(err))
            .finally(() => loader.changeStatus(cardsLoader, false));
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Главная');
    }
  });
