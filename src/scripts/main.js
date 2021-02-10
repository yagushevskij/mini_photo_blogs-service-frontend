import '../pages/index.css';
import {
  signinButton, signupButton, signupPopupTemplate,
}
  from './constants/selectors';

import { config } from './data.js';
import { Api } from './Api.js';
import { Loader } from './Loader.js';
import { UserInfo } from './UserInfo.js';
import { Card } from './Card.js';
import { CardList } from './CardList.js';
// import {Popup} from './Popup.js';
// import {FormPopup} from './FormPopup.js';
import { AvatarPopup } from './AvatarPopup.js';
import { CardPopup } from './CardPopup.js';
import { ProfilePopup } from './ProfilePopup.js';
import { ImagePopup } from './ImagePopup.js';
import { SignupPopup } from './SignupPopup';
import { FormValidator } from './FormValidator.js';

(function () {
  const cardsContainer = document.querySelector('.places-list');
  const popupContainer = document.querySelector('.popup');
  const templateCard = document.querySelector('#card').content;
  const cardsLoader = document.querySelector('#cards-loader');
  const profileContainer = document.querySelector('.user-info');

  const createFormValidator = (...arg) => new FormValidator(...arg);

  const api = new Api(config);
  const loader = new Loader();

  const createCard = (obj) => new Card(imagePopup, templateCard, api).create(obj);

  const cardList = new CardList(cardsContainer, createCard);
  const { addCard } = cardList;

  const userInfo = new UserInfo(profileContainer, ['name', 'about'], ['avatar']);

  const imagePopup = new ImagePopup(document.querySelector('#image-popup'), popupContainer);
  const profilePopup = new ProfilePopup(document.querySelector('#profile-popup'), popupContainer, userInfo, api);
  const cardPopup = new CardPopup(document.querySelector('#place-popup'), popupContainer, addCard, api);
  const avatarPopup = new AvatarPopup(document.querySelector('#avatar-popup'), popupContainer, userInfo, api);
  const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer);
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

  const urlParams = window.location.search;
  const regExp = new RegExp(`\\?${config.userPath}\\=[a-zA-Z0-9]+`);
  if (regExp.test(urlParams)) {
    const username = urlParams.replace(`?${config.userPath}=`, '');
    loader.changeStatus(cardsLoader, true);
    api.getData(config.usersApiUrl + username)
      .then((res) => {
        userInfo.setUserInfo(res);
        userInfo.updateUserInfo();
        return res;
      })
      .then((res) => {
        api.getData(config.userCardsApiUrl + res._id)
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
