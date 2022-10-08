const url = 'http://153.92.222.43:8036';
// const url = 'http://179.61.219.179:8036';
const socket = 'ws://153.92.222.43:8036/chat';
// const socket = 'ws://179.61.219.179:8036/chat';
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
