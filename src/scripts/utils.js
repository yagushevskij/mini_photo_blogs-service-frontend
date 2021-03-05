import { config, MAIN_URL } from './constants/data';

const getElementFromTemp = (template) => template.content.cloneNode(true).children[0];

const getUserPageUrl = (userName) => process.env.NODE_ENV === 'production'
  ? `${MAIN_URL}/${config.userPageFeature.path}/${userName}`
  : `${MAIN_URL}?${config.userPageFeature.path}=${userName}`;

const getUserPageUrlRegExp = () => process.env.NODE_ENV === 'production'
  ? `\\${config.userPageFeature.path}\\/[a-zA-Z0-9]+`
  : `\\?${config.userPageFeature.path}\\=[a-zA-Z0-9]+`;

const getExtractNameRegExp = () => process.env.NODE_ENV === 'production'
  ? `\\${config.userPageFeature.path}\\/(.*)$`
  : `\\?${config.userPageFeature.path}\\=(.*)$`;

export {
  getElementFromTemp, getUserPageUrl, getUserPageUrlRegExp, getExtractNameRegExp,
};
