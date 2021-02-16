import './pages/index.css';
import {
  cardsContainer, popupContainer, cardTemplate, profileContainer, cardsLoader,
  signupPopupTemplate, signinPopupTemplate, imagePopupTemplate,
  profilePopupTemplate, cardPopupTemplate, avatarPopupTemplate, userBlockContainer,
  userMenuTemplate, userLinksTemplate, profileTemplate,
}
  from './scripts/constants/selectors';

import config from './scripts/constants/data';
import { Api } from './scripts/classes/Api';
import { Loader } from './scripts/classes/Loader';
import { UserInfo } from './scripts/classes/UserInfo';
import { Card } from './scripts/classes/Card';
import { CardList } from './scripts/classes/CardList';
import { AvatarPopup } from './scripts/classes/AvatarPopup';
import { CardPopup } from './scripts/classes/CardPopup';
import { ProfilePopup } from './scripts/classes/ProfilePopup';
import { ImagePopup } from './scripts/classes/ImagePopup';
import { SignupPopup } from './scripts/classes/SignupPopup';
import { SigninPopup } from './scripts/classes/SigninPopup';
import { FormValidator } from './scripts/classes/FormValidator';
import { Header } from './scripts/classes/Header';
import { UserMenu } from './scripts/classes/UserMenu';
import { User } from './scripts/classes/User';

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
const updateUserInfo = (...args) => userInfo.update(...args);
const updateUserMenu = (...args) => userMenu.update(...args);
const openUserMenu = (...args) => userMenu.open(...args);

const createFormValidator = (...args) => new FormValidator(...args, config.text);
const createCard = (...args) => new Card(openImagePopup, cardTemplate, addLikeRequest,
  removeLikeRequest, removeCardRequest).create(user.data._id, ...args);
const openCardPopup = () => new CardPopup(cardPopupTemplate, popupContainer, createFormValidator,
  sendCardToApi, cardList.addCard).open();
const openAvatarPopup = () => new AvatarPopup(avatarPopupTemplate, popupContainer,
  createFormValidator, sendAvatarDataToApi, updateUserInfo, updateUserMenu).open();
const openProfilePopup = () => new ProfilePopup(profilePopupTemplate, popupContainer,
  createFormValidator, sendUserDataToApi, updateUserInfo, updateUserMenu).open(user.data);
const openSignupPopup = () => new SignupPopup(signupPopupTemplate, popupContainer,
  createFormValidator, sendRegDataToApi, config.userPageFeature.url).open();
const openSigninPopup = () => new SigninPopup(signinPopupTemplate, popupContainer,
  createFormValidator, sendAuthDataToApi, config.userPageFeature.url).open();

const api = new Api(config.headers);
const user = new User(config.userPageFeature.url);
const header = new Header(userBlockContainer);
const userInfo = new UserInfo(profileContainer, profileTemplate, openCardPopup, openAvatarPopup,
  openProfilePopup, ['name', 'about']);
const imagePopup = new ImagePopup(imagePopupTemplate, popupContainer);
const cardList = new CardList(cardsContainer, createCard);
const userMenu = new UserMenu(userMenuTemplate, userLinksTemplate,
  openSignupPopup, openSigninPopup, config.menuLinks);
const loader = new Loader();

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
    const createdUserMenu = userMenu.create(user.data, user.pageUrl);
    header.render(createdUserMenu);
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
