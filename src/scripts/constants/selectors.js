const userCardsWrapper = document.querySelector('.user-cards-wrapper');
const userCardsContainer = document.querySelector('.cards-list');
const popupContainer = document.querySelector('.popup');
const cardTemplate = document.querySelector('#user-card');
const userMenuTemplate = document.querySelector('#user-menu');
const userLinksTemplate = document.querySelector('#user-links');
const cardsLoader = document.querySelector('#cards-loader');
const profileContainer = document.querySelector('.profile');
const profileTemplate = document.querySelector('#user-profile');
const signupPopupTemplate = document.querySelector('#signup-popup');
const signinPopupTemplate = document.querySelector('#signin-popup');
const imagePopupTemplate = document.querySelector('#image-popup');
const profilePopupTemplate = document.querySelector('#profile-popup');
const cardPopupTemplate = document.querySelector('#card-popup');
const avatarPopupTemplate = document.querySelector('#avatar-popup');
const userBlockContainer = document.querySelector('.header__user-container');

export {
  userCardsWrapper, userCardsContainer, popupContainer, cardTemplate, profileContainer, cardsLoader,
  signupPopupTemplate,
  signinPopupTemplate, imagePopupTemplate, profilePopupTemplate, cardPopupTemplate,
  avatarPopupTemplate, userBlockContainer, userMenuTemplate, userLinksTemplate, profileTemplate,
};
