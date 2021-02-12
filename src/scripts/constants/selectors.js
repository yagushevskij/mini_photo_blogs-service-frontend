const cardsContainer = document.querySelector('.places-list');
const popupContainer = document.querySelector('.popup');
const templateCard = document.querySelector('#card').content;
const cardsLoader = document.querySelector('#cards-loader');
const profileContainer = document.querySelector('.user-info');
const signinButton = document.querySelector('.header__button_type_signin');
const signupButton = document.querySelector('.header__button_type_signup');
const signupPopupTemplate = document.querySelector('#signup-popup');
const signinPopupTemplate = document.querySelector('#signin-popup');

export {
  cardsContainer, popupContainer, templateCard, profileContainer, cardsLoader, signinButton,
  signupButton, signupPopupTemplate, signinPopupTemplate,
};
