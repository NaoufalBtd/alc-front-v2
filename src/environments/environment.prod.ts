// const url = 'http://localhost:8036';
const url = 'http://back.engflexy.com';
// const socket = 'ws://localhost:8036/chat';
const socket = 'ws://back.engflexy.com/chat';
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
};
