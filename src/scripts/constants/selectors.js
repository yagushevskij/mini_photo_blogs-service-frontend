const userCardsWrapper = document.querySelector('.cards-wrapper_type_user-cards');
const userCardsContainer = document.querySelector('.cards-list_type_user-cards');
const topCardsWrapper = document.querySelector('.cards-wrapper_type_top-cards');
const topCardsContainer = document.querySelector('.cards-list_type_top-cards');
const popupContainer = document.querySelector('.popup');
const userCardTemplate = document.querySelector('#user-card');
const imageCardTemplate = document.querySelector('#image-card');
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
  userCardsWrapper, userCardsContainer, popupContainer, userCardTemplate, profileContainer,
  cardsLoader, signupPopupTemplate, imageCardTemplate,
  signinPopupTemplate, imagePopupTemplate, profilePopupTemplate, cardPopupTemplate,
  avatarPopupTemplate, userBlockContainer, userMenuTemplate, userLinksTemplate, profileTemplate,
  topCardsWrapper, topCardsContainer,
};
