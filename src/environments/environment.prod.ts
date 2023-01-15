const url = 'https://engflexy.ma';
const socket = 'wss://engflexy.ma/chat';

export const environment = {
    production: true,
    baseUrl: url + '/learn/',
    baseApi: url,
    sectionItemUrl: url + '/learn/sectionItem/',
    translationHost: url + '/learn/TranslateEnAr/text/translationFeatures/',
    adminUrl: url + '/admin/',
    profUrl: url + '/prof/',
    etudiantUrl: url + '/etudiant/',
    publicUrl: url + '/public/',
    socketUrl: socket,
    signWithGoogleApi: url + '/admin/admin/googlesignin',
    signWithGmailApi: url + '/admin/gmail/googlesignin',
    okUrl: 'https://engflexy.com/ok',
    failUrl: 'https://engflexy.com/fail',
    shopUrl: 'https://engflexy.com',
    callbackUrl: 'https://engflexy.com/back'
};
