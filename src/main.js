import './pages/index.css';
import {
  popupContainer, userCardTemplate, circleLoaderTemplate, headerContainer, blockLoaderTemplate,
  signupPopupTemplate, signinPopupTemplate, imagePopupTemplate, mainContentContainer,
  profilePopupTemplate, cardPopupTemplate, avatarPopupTemplate, userBlockContainer,
  userMenuTemplate, profileTemplate, imageCardTemplate, serverErrorPopupTemplate,
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
const createFormValidator = () => new FormValidator(config.text, config.fileExtensions);
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
  renderAsyncImage,
  renderPage,
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
  config: config.popups.imagePopup,
  renderAsyncImage,
  loader: createLoader(circleLoaderTemplate),
})
  .open(...args);
const openCardPopup = () => new CardPopup({
  template: cardPopupTemplate,
  container: popupContainer,
  addCard: userCardList.addCard,
  createFormValidator,
  sendCardToApi,
  uploadCard,
  config: config.popups.cardPopup,
}).open();
const openAvatarPopup = () => new AvatarPopup({
  template: avatarPopupTemplate,
  container: popupContainer,
  sendDataToApi: sendAvatarDataToApi,
  createFormValidator,
  updateUserInfo,
  updateUserMenu,
  config: config.popups.avatarPopup,
}).open();
const openProfilePopup = (...args) => new ProfilePopup({
  template: profilePopupTemplate,
  container: popupContainer,
  sendDataToApi: sendUserDataToApi,
  createFormValidator,
  updateUserInfo,
  updateUserMenu,
  config: config.popups.profilePopup,
}).open(...args);
const openSignupPopup = () => new SignupPopup({
  template: signupPopupTemplate,
  container: popupContainer,
  sendDataToApi: sendRegDataToApi,
  updateUserData: user.updateData,
  createFormValidator,
  renderPage,
  openSigninPopup,
  config: config.popups.signupPopup,
}).open();
const openSigninPopup = () => new SigninPopup({
  template: signinPopupTemplate,
  container: popupContainer,
  sendDataToApi: sendAuthDataToApi,
  updateUserData: user.updateData,
  createFormValidator,
  renderPage,
  openSignupPopup,
  config: config.popups.signinPopup,
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

const renderUserInfoBlock = async (username) => api.sendRequest({
  url: config.reqApiParams.getUserInfo.url + username,
  method: config.reqApiParams.getUserInfo.method,
  headers: config.reqApiParams.getUserInfo.headers,
})
  .then((res) => {
    userInfo.render({
      userPageData: res,
      authUserData: user.data,
    });
    return res;
  })
  .catch((err) => console.log(err));

const renderUserCardsBlock = (owner) => api.sendRequest({
  url: config.reqApiParams.getUserCards.url + owner._id,
  method: config.reqApiParams.getUserCards.method,
  headers: config.reqApiParams.getUserCards.headers,
})
  .then((cards) => {
    userCardsBlock.create({
      authUser: user.data,
      cardsOwner: owner,
      cardsArr: cards,
    });
  })
  .catch((err) => console.log(err));

const renderTopCardsBlock = () => api.sendRequest({
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
  });

const renderPage = (username) => {
  const createdUserMenu = (user.data) ? userMenu.create(user.data) : userMenu.create();
  const apiResponseLoader = createLoader(circleLoaderTemplate);
  header.render(createdUserMenu);
  clearContainer(mainContentContainer);
  if (username && typeof (username) === 'string') {
    apiResponseLoader.show({ container: mainContentContainer });
    renderUserInfoBlock(username)
      .then((res) => {
        if (res) {
          renderUserCardsBlock(res);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => apiResponseLoader.remove());
  } else {
    renderTopCardsBlock();
  }
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
const user = new User(getUserPageUrl);
const header = new Header({
  container: headerContainer,
  userBlockContainer,
  renderPage,
  openSigninPopup,
});
const userInfo = new UserInfo({
  container: mainContentContainer,
  template: profileTemplate,
  config: config.userInfo,
  loader: createLoader(blockLoaderTemplate),
  openCardPopup,
  openAvatarPopup,
  openProfilePopup,
  renderAsyncImage,
  openErrorPopup,
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
  signout,
  renderAsyncImage,
  renderPage,
});
const topUpBtn = new TopUpBtn(topUpTriangle);

const isPageUserpage = () => {
  const userPageUrlregExp = new RegExp(config.userPageFeature.getUserPageUrlRegExp());
  return (userPageUrlregExp.test(config.userPageFeature.getUrlParams()));
};

const apiResponseLoader = createLoader(circleLoaderTemplate);
apiResponseLoader.show({ container: mainContentContainer });
getUserInfoFromApi()
  .then((res) => {
    user.setData(res);
  }).catch((err) => {
    console.log(err);
  })
  .finally(() => {
    apiResponseLoader.remove();
    if (isPageUserpage()) {
      const username = new RegExp(config.userPageFeature.getExtractNameRegExp())
        .exec(config.userPageFeature.getUrlParams())[1];
      renderPage(username);
    } else {
      renderPage();
    }
  });

topUpBtn.setEventListener();
document.addEventListener('keydown', (event) => { // Убираем срабатывание кнопок на странице по нажатию enter;
  if (event.keyCode === 13 && event.target.nodeName === 'BUTTON') {
    event.preventDefault();
  }
});
