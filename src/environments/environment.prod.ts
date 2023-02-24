const url = 'https://engflexy.ma';
const socket = 'https://engflexy.ma/socketio/';

export const environment = {
    production: false,
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
    okUrl: 'https://engflexy.ma/ok',
    failUrl: 'https://engflexy.ma/fail',
    callbackUrl: 'https://engflexy.ma/back',
    shopUrl: 'https://engflexy.com',
    payFailedReasonUrl: url + '/pay-error-reason/'

};
