/*
 * constants
 */

const JWT = {
  CLIENT_SECRET:'_#Kd2#,BKQ~)Jcm7L]oF8/s.3DPb-?4[',
  EXPIRES_IN: 10000
};

const permisos =[
]


const CAPTCHA = '6Lf4X3QfAAAAACB56TKsJ0Sw1Yn_M5Q30ENv5miE';

const MAX_LOGIN_RETRY_LIMIT = 5;
const LOGIN_REACTIVE_TIME = 360;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRETIME: 20
};
module.exports = {
  JWT, CAPTCHA, permisos,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH

};

