import './pages/index.css';
import {
  popupContainer, userCardTemplate, circleLoaderTemplate, headerContainer, blockLoaderTemplate,
  signupPopupTemplate, signinPopupTemplate, imagePopupTemplate, mainContentContainer,
  profilePopupTemplate, cardPopupTemplate, avatarPopupTemplate, userBlockContainer,
  userMenuTemplate, userLinksTemplate, profileTemplate, imageCardTemplate, serverErrorPopupTemplate,
  topUpTriangle,
}
  from './scripts/constants/selectors';
import {
  getElementFromTemp, getUserPageUrl, clearContainer,
} from './scripts/utils';

import { config } from './scripts/constants/config';
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
import { UserCardsBlock } from './scripts/classes/UserCardsBlock';
import { TopCardsBlock } from './scripts/classes/TopCardsBlock';
import { ErrorPopup } from './scripts/classes/ErrorPopup';
import { TopUpBtn } from './scripts/classes/TopUpBtn';
import { AsyncImage } from './scripts/classes/AsyncImage';

// Колбэки
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
const updateUserCardsBlock = (...args) => userCardsBlock.update(...args);

const setValidateListeners = (...args) => formValidator.setEventListeners(...args);
const removeValidateListeners = () => formValidator.removeEventListeners();
const setServerError = (message) => formValidator.setServerError(message);
const createUserCard = (...args) => new Card({
  openImagePopup,
  addLikeRequest,
  removeLikeRequest,
  removeCardRequest,
  renderAsyncImage,
  updateCardsBlock: updateUserCardsBlock,
  config: config.userCards.card,
  loader: createLoader(blockLoaderTemplate),
}).create({
  view: getElementFromTemp(userCardTemplate),
  userData: user.data,
}, ...args);
const createImageCard = (...args) => new Card({
  openImagePopup,
  addLikeRequest,
  removeLikeRequest,
  removeCardRequest,
  getUserPageUrl,
  renderAsyncImage,
  config: config.topCards.card,
  loader: createLoader(blockLoaderTemplate),
}).create({
  view: getElementFromTemp(imageCardTemplate),
  userData: user.data,
}, ...args);
const openErrorPopup = (...args) => new ErrorPopup({
  template: serverErrorPopupTemplate,
  container: popupContainer,
})
  .open(...args);
const openImagePopup = (...args) => new ImagePopup({
  template: imagePopupTemplate,
  container: popupContainer,
  config: config.imagePopup,
  renderAsyncImage,
  loader: createLoader(circleLoaderTemplate),
})
  .open(...args);
const openCardPopup = () => new CardPopup({
  template: cardPopupTemplate,
  container: popupContainer,
  addCard: userCardList.addCard,
  setValidateListeners,
  removeValidateListeners,
  setServerError,
  sendCardToApi,
  uploadCard,
}).open();
const openAvatarPopup = () => new AvatarPopup({
  template: avatarPopupTemplate,
  container: popupContainer,
  sendDataToApi: sendAvatarDataToApi,
  setValidateListeners,
  removeValidateListeners,
  setServerError,
  updateUserInfo,
  updateUserMenu,
}).open();
const openProfilePopup = () => new ProfilePopup({
  template: profilePopupTemplate,
  container: popupContainer,
  sendDataToApi: sendUserDataToApi,
  setValidateListeners,
  removeValidateListeners,
  setServerError,
  updateUserInfo,
  updateUserMenu,
}).open(userInfo.data);
const openSignupPopup = () => new SignupPopup({
  template: signupPopupTemplate,
  container: popupContainer,
  sendDataToApi: sendRegDataToApi,
  updateUserData: user.updateData,
  setValidateListeners,
  removeValidateListeners,
  setServerError,
  renderPage,
}).open();
const openSigninPopup = () => new SigninPopup({
  template: signinPopupTemplate,
  container: popupContainer,
  sendDataToApi: sendAuthDataToApi,
  updateUserData: user.updateData,
  setValidateListeners,
  removeValidateListeners,
  setServerError,
  renderPage,
}).open();
const signout = () => {
  sendApiRequest(config.reqApiParams.signout)
    .then(() => {
      user.updateData();
      renderPage();
    })
    .catch((err) => console.log(err));
};
const renderAsyncImage = (...args) => new AsyncImage().render(...args);
const createLoader = (loaderElem) => new Loader(loaderElem);

const renderUserPage = (username) => {
  clearContainer(mainContentContainer);
  const apiResponseLoader = createLoader(circleLoaderTemplate);
  apiResponseLoader.show({ container: mainContentContainer });
  api.sendRequest({
    url: config.reqApiParams.getUserInfo.url + username,
    method: config.reqApiParams.getUserInfo.method,
    headers: config.reqApiParams.getUserInfo.headers,
  })
    .then((res) => {
      userInfo.render({
        data: res,
        isUserPageOwner: res._id === user.data._id,
      });
      return res;
    })
    .then((res) => {
      api.sendRequest({
        url: config.reqApiParams.getUserCards.url + res._id,
        method: config.reqApiParams.getUserCards.method,
        headers: config.reqApiParams.getUserCards.headers,
      })
        .then((cards) => {
          userCardsBlock.create({
            authUser: user.data,
            cardsOwner: res,
            cardsArr: cards,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => apiResponseLoader.remove());
    })
    .catch((err) => {
      openErrorPopup(config.text.errors.apiErr);
      console.log(err);
    });
};

const renderMainPage = () => {
  clearContainer(mainContentContainer);
  const apiResponseLoader = createLoader(circleLoaderTemplate);
  apiResponseLoader.show({ container: mainContentContainer });
  api.sendRequest({
    url: config.reqApiParams.getAllUsersCards.url,
    method: config.reqApiParams.getAllUsersCards.method,
    headers: config.reqApiParams.getUserCards.headers,
  })
    .then((cards) => {
      topCardsBlock.create({
        authUser: user.data,
        cardsArr: cards,
      });
    })
    .catch((err) => {
      openErrorPopup(config.text.errors.apiErr);
      console.log(err);
    })
    .finally(() => apiResponseLoader.remove());
};

const sendCardToApi = (...args) => api.sendRequest(config.reqApiParams.addCard, ...args);
const uploadCard = (...args) => api.sendRequest(config.reqApiParams.upload, ...args);
const sendRegDataToApi = (...args) => api.sendRequest(config.reqApiParams.signup, ...args);
const sendAuthDataToApi = (...args) => api.sendRequest(config.reqApiParams.signin, ...args);
const sendAvatarDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeAvatar,
  ...args);
const sendUserDataToApi = (...args) => api.sendRequest(config.reqApiParams.changeUserInfo,
  ...args);

const api = new Api(config);
const user = new User(getUserInfoFromApi, getUserPageUrl);
const header = new Header({
  container: headerContainer,
  userBlockContainer,
  renderMainPage,
});
const formValidator = new FormValidator(config.text, config.fileExtensions);
const userInfo = new UserInfo({
  container: mainContentContainer,
  template: profileTemplate,
  config: config.avatar,
  loader: createLoader(blockLoaderTemplate),
  openCardPopup,
  openAvatarPopup,
  openProfilePopup,
  renderAsyncImage,
});
const userCardList = new CardList({
  createCard: createUserCard,
  updateCardsBlock: updateUserCardsBlock,
});
const topCardList = new CardList({
  createCard: createImageCard,
  updateCardsBlock: updateUserCardsBlock,
});
const userCardsBlock = new UserCardsBlock({
  renderCardList: userCardList.render,
  container: mainContentContainer,
  config: config.userCards,
});
const topCardsBlock = new TopCardsBlock({
  renderCardList: topCardList.render,
  container: mainContentContainer,
  config: config.topCards,
});
const userMenu = new UserMenu({
  config: config.userMenu,
  loader: createLoader(blockLoaderTemplate),
  userMenuTemplate,
  userLinksTemplate,
  openSignupPopup,
  openSigninPopup,
  signout,
  renderAsyncImage,
  renderUserPage,
});

const isPageUserpage = () => {
  const userPageUrlregExp = new RegExp(config.userPageFeature.getUserPageUrlRegExp());
  return (userPageUrlregExp.test(config.userPageFeature.getUrlParams()));
};
const topUpBtn = new TopUpBtn(topUpTriangle);

const renderPage = () => {
  const createdUserMenu = (user.data) ? userMenu.create(user.data) : userMenu.create();
  header.render(createdUserMenu);
  if (isPageUserpage()) {
    const username = new RegExp(config.userPageFeature.getExtractNameRegExp())
      .exec(config.userPageFeature.getUrlParams())[1];
    renderUserPage(username);
  } else {
    renderMainPage();
  }
};

const apiResponseLoader = createLoader(circleLoaderTemplate);
apiResponseLoader.show({ container: mainContentContainer });
user.setData()
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    apiResponseLoader.remove();
    renderPage();
  });
topUpBtn.setEventListener();

// Наполнение массива карточек для теста новых фич.
// const formData = new FormData();
// formData.append('name', 'ololo');
// formData.append('link', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg');
// const timerId = () => setInterval(() => sendCardToApi(formData), 7000);
// timerId();

document.addEventListener('keydown', (event) => { // Убираем срабатывание кнопок на странице по нажатию enter;
  if (event.keyCode === 13 && event.target.nodeName === 'BUTTON') {
    event.preventDefault();
  }
});
