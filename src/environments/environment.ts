const url = 'http://localhost:8036';
// const url = 'https://engflexy.ma';
const socket = 'ws://localhost:8036/chat';
// const socket = 'wss://engflexy.ma/chat';

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
};
