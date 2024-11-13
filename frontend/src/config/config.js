import configData from './config.json';

const getConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  return configData[environment];
};

export const API_URL = getConfig().API_URL;