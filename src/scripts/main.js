import "../pages/index.css";

import {config} from './data.js';
import {Api} from './Api.js';
import {Loader} from './Loader.js';
import {UserInfo} from './UserInfo.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
// import {Popup} from './Popup.js';
// import {FormPopup} from './FormPopup.js';
import {AvatarPopup} from './AvatarPopup.js';
import {CardPopup} from './CardPopup.js';
import {ProfilePopup} from './ProfilePopup.js';
import {ImagePopup} from './ImagePopup.js';
import {FormValidator} from './FormValidator.js';


(function () {
    'use strict';
    console.log(window.location.port, window.location.search);
    const cardsContainer = document.querySelector('.places-list');
    const popupContainer = document.querySelector('.popup');
    const templateCard = document.querySelector('#card').content;
    const cardsLoader = document.querySelector('#cards-loader');
    const profileContainer = document.querySelector('.user-info');

    const createFormValidator = (...arg) => new FormValidator(...arg);

    const api = new Api(config);
    const loader = new Loader();

    const createCard = (obj) => {
        return new Card(imagePopup, templateCard, api).create(obj);
    };

    const cardList = new CardList(cardsContainer, createCard);
    const addCard = cardList.addCard;

    const userInfo = new UserInfo(profileContainer, ['name', 'about',], ['avatar']);

    const imagePopup = new ImagePopup(document.querySelector('#image-popup'), popupContainer);
    const profilePopup = new ProfilePopup(document.querySelector('#profile-popup'), popupContainer, userInfo, api);
    const cardPopup = new CardPopup(document.querySelector('#place-popup'), popupContainer, addCard, api);
    const avatarPopup = new AvatarPopup(document.querySelector('#avatar-popup'), popupContainer, userInfo, api);

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

    loader.changeStatus(cardsLoader, true);
    api.getData(config.cardsApiUrl)
        .then(res => {
            cardList.render(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => loader.changeStatus(cardsLoader, false));

    api.getData(config.userApiUrl)
        .then(res => {
            userInfo.setUserInfo(res);
            userInfo.updateUserInfo()
        })
        .catch((err) => {
            console.log(err);
        });
})();

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
