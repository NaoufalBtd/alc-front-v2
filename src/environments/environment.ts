

// const url = 'http://localhost:8036';
const url = 'https://back.engflexy.com';
// const socket = 'ws://localhost:8036/chat';
const socket = 'wss://back.engflexy.com/chat';

export const environment = {
    production: false,
    baseUrl: url + '/learn/',
    baseApi: url ,
    sectionItemUrl: url +  '/learn/sectionItem/',
    translationHost: url + '/learn/TranslateEnAr/text/translationFeatures/',
    adminUrl: url + '/admin/',
    profUrl: url + '/prof/',
    etudiantUrl: url + '/etudiant/',
    publicUrl: url + '/public/',
    socketUrl: socket,
    signWithGoogleApi: url +  '/admin/admin/googlesignin',
    signWithGmailApi: url + '/admin/gmail/googlesignin',

    // baseUrl: 'http://162.19.25.141:8036/learn/',
    // baseApi: 'http://162.19.25.141:8036',
    // sectionItemUrl: 'http://162.19.25.141:8036/learn/sectionItem/',
    // translationHost: 'http://162.19.25.141:8036/learn/TranslateEnAr/text/translationFeatures/',
    // adminUrl: 'http://162.19.25.141:8036/admin/',
    // profUrl: 'http://162.19.25.141:8036/prof/',
    // etudiantUrl: 'http://162.19.25.141:8036/etudiant/',
    // publicUrl: 'http://162.19.25.141:8036/public/',
    // socketUrl: 'ws://162.19.25.141:8036/chat',
    // signWithGoogleApi: 'http://162.19.25.141:8036/admin/admin/googlesignin',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
