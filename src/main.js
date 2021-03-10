import './pages/index.css';
import {
  userCardsContainer, popupContainer, userCardTemplate, profileContainer, cardsLoader,
  signupPopupTemplate, signinPopupTemplate, imagePopupTemplate,
  profilePopupTemplate, cardPopupTemplate, avatarPopupTemplate, userBlockContainer,
  userMenuTemplate, userLinksTemplate, profileTemplate, userCardsWrapper,
  topCardsWrapper, topCardsContainer, imageCardTemplate,
}
  from './scripts/constants/selectors';
import {
  getElementFromTemp, getUserPageUrl,
} from './scripts/utils';

import { config } from './scripts/constants/data';
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
import { PhotoGallery } from './scripts/classes/PhotoGallery';

// Колбэки
const openPopup = (popup, ...args) => popup.open(args);
const openImagePopup = (...args) => openPopup(imagePopup, ...args);

const sendApiRequest = (...args) => api.sendRequest(...args);
const addLikeRequest = (cardId) => sendApiRequest({
  method: config.reqApiParams.addLike.method,
  url: config.reqApiParams.addLike.url + cardId,
  headers: config.reqApiParams.addLike.headers,
});
const removeLikeRequest = (cardId) => sendApiRequest({
  method: config.reqApiParams.removeLike.method,
  url: config.reqApiParams.addLike.url + cardId,
  headers: config.reqApiParams.removeLike.headers,
});
const removeCardRequest = (cardId) => sendApiRequest({
  method: config.reqApiParams.deleteCard.method,
  url: config.reqApiParams.deleteCard.url + cardId,
  headers: config.reqApiParams.deleteCard.headers,
});
const getUserInfoFromApi = () => sendApiRequest(config.reqApiParams.checkUserExist);
const updateUserInfo = (...args) => userInfo.update(...args);
const updateUserMenu = (...args) => userMenu.update(...args);

const setValidateListeners = (...args) => formValidator.setEventListeners(...args);
const removeValidateListeners = () => formValidator.removeEventListeners();
const createUserCard = (...args) => new Card(openImagePopup, addLikeRequest,
  removeLikeRequest, removeCardRequest).create({
    isGalleryItem: false,
    view: getElementFromTemp(userCardTemplate),
    classNames: {
      img: '.place-card__image',
      likeIcon: '.place-card__like-icon',
      likeCount: '.place-card__like-counter',
      removeIcon: '.place-card__delete-icon',
      name: '.place-card__name',
      likedIcon: 'place-card__like-icon_liked',
    },
  },
    user.data._id, ...args);
const createImageCard = (...args) => new Card(openImagePopup, addLikeRequest,
  removeLikeRequest, removeCardRequest, setElementGridSize).create({
    isGalleryItem: true,
    view: getElementFromTemp(imageCardTemplate),
    classNames: {
      img: '.image-card__image',
      likeIcon: '.image-card__like-icon',
      likeCount: '.image-card__like-counter',
      removeIcon: '.image-card__delete-icon',
      name: '.image-card__name',
      likedIcon: 'image-card__like-icon_liked',
      userLink: '.image-card__username-link',
    },
  },
    user.data._id, ...args);
const openCardPopup = () => new CardPopup(cardPopupTemplate, popupContainer, setValidateListeners,
  removeValidateListeners, sendCardToApi, uploadCard, userCardList.addCard).open();
const openAvatarPopup = () => new AvatarPopup(avatarPopupTemplate, popupContainer,
  setValidateListeners, removeValidateListeners, sendAvatarDataToApi, updateUserInfo,
  updateUserMenu).open();
const openProfilePopup = () => new ProfilePopup(profilePopupTemplate, popupContainer,
  setValidateListeners, removeValidateListeners, sendUserDataToApi, updateUserInfo,
  updateUserMenu).open(user.data);
const openSignupPopup = () => new SignupPopup(signupPopupTemplate, popupContainer,
  setValidateListeners, removeValidateListeners, sendRegDataToApi, renderPage,
  user.updateData).open();
const openSigninPopup = () => new SigninPopup(signinPopupTemplate, popupContainer,
  setValidateListeners, removeValidateListeners, sendAuthDataToApi, renderPage,
  user.updateData).open();
const signout = () => {
  sendApiRequest(config.reqApiParams.signout)
    .then(() => {
      user.updateData(null);
      renderPage();
    })
    .catch((err) => console.log(err));
};
const setElementGridSize = (...args) => photoGallery.setSize(...args);

const api = new Api(config.headers);
const user = new User(getUserInfoFromApi, getUserPageUrl);
const header = new Header(userBlockContainer);
const formValidator = new FormValidator(config.text, config.fileExtensions);
const userInfo = new UserInfo(profileContainer, profileTemplate, openCardPopup, openAvatarPopup,
  openProfilePopup, ['name', 'about']);
const imagePopup = new ImagePopup(imagePopupTemplate, popupContainer);
const userCardList = new CardList(userCardsContainer, userCardsWrapper, createUserCard);
const topCardList = new CardList(topCardsContainer, topCardsWrapper, createImageCard);
const userMenu = new UserMenu(userMenuTemplate, userLinksTemplate,
  openSignupPopup, openSigninPopup, signout);
const loader = new Loader();
const photoGallery = new PhotoGallery(config.gallery);

const sendCardToApi = (...args) => api.sendRequest(config.reqApiParams.addCard, ...args);
const uploadCard = (...args) => api.sendRequest(config.reqApiParams.upload, ...args);
const sendRegDataToApi = (...args) => api.sendRequest(config.reqApiParams.signup, ...args);
const sendAuthDataToApi = (...args) => api.sendRequest(config.reqApiParams.signin, ...args);
const sendAvatarDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeAvatar,
  ...args);
const sendUserDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeUserInfo,
  ...args);

const isPageUserpage = () => {
  const userPageUrlregExp = new RegExp(config.userPageFeature.getUserPageUrlRegExp());
  return (userPageUrlregExp.test(config.userPageFeature.getUrlParams()));
};

const renderUserPage = () => {
  const username = new RegExp(config.userPageFeature.getExtractNameRegExp())
    .exec(config.userPageFeature.getUrlParams())[1];
  loader.changeStatus(cardsLoader, true);
  api.sendRequest({
    url: config.reqApiParams.getUserInfo.url + username,
    method: config.reqApiParams.getUserInfo.method,
    headers: config.reqApiParams.getUserInfo.headers,
  })
    .then((res) => {
      userInfo.render(user.data, res);
      return res;
    })
    .then((res) => {
      api.sendRequest({
        url: config.reqApiParams.getUserCards.url + res._id,
        method: config.reqApiParams.getUserCards.method,
        headers: config.reqApiParams.getUserCards.headers,
      })
        .then((cards) => {
          userCardList.render(cards);
        })
        .catch((err) => console.log(err))
        .finally(() => loader.changeStatus(cardsLoader, false));
    })
    .catch((err) => console.log(err));
};

const renderMainPage = () => {
  api.sendRequest({
    url: config.reqApiParams.getAllUsersCards.url,
    method: config.reqApiParams.getAllUsersCards.method,
    headers: config.reqApiParams.getUserCards.headers,
  })
    .then((cards) => {
      photoGallery.create(topCardsContainer, cards);
      topCardList.render(cards);
    })
    .catch((err) => console.log(err))
    .finally(() => loader.changeStatus(cardsLoader, false));
};

const renderPage = () => {
  const createdUserMenu = (user.data) ? userMenu.create(user.data) : userMenu.create();
  header.render(createdUserMenu);
  if (isPageUserpage()) {
    renderUserPage();
  } else {
    renderMainPage();
  }
};

user.setData()
  .catch((err) => console.log(err))
  .finally(() => {
    renderPage();
  });

document.addEventListener('keydown', (event) => { // Убираем срабатывание кнопок на странице по нажатию enter;
  if (event.keyCode === 13 && event.target.nodeName === 'BUTTON') {
    event.preventDefault();
  }
});
