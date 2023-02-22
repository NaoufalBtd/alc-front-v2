const url = 'http://localhost:8036';
// const url = 'https://engflexy.ma/back';
const socket = 'http://localhost:8088/';
// const socket = 'https://engflexy.ma/';

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
    okUrl: url + '/ok',
    failUrl: url + '/fail',
    shopUrl: 'http://localhost:4200',
    callbackUrl: url + '/back',
    payFailedReasonUrl: url + '/pay-error-reason/'
};
