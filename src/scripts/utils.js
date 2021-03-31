import { config, MAIN_URL } from './constants/config';

const getElementFromTemp = (template) => template.content.cloneNode(true).children[0];

const getUserPageUrl = (userName) => (process.env.NODE_ENV === 'production'
  ? `${MAIN_URL}/${config.userPageFeature.path}/${userName}`
  : `${MAIN_URL}?${config.userPageFeature.path}=${userName}`);

export {
  getElementFromTemp, getUserPageUrl,
};
