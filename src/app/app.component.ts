import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                public translate: TranslateService) {
        translate.setDefaultLang('en');
        const lang = window.navigator.language;
        console.log('=====================');
        console.log(lang);
        console.log('=====================');
        if (lang?.includes('ar')) {
            translate.use('ar');
        } else if (lang?.includes('fr')) {
            translate.use('fr');
        } else {
            translate.use('en');
        }
    }

    layoutMode = 'slim';

    languages = [
        {code: 'ar', name: 'Arabic', nativeName: 'العربية'},
        {code: 'fr', name: 'French', nativeName: 'français'},
    ];


    lightMenu = true;

    topbarColor = 'layout-topbar-dark';

    inlineUser = false;
    inlineUser2 = false;
    inlineUser3 = false;

    isRTL = false;

    inputStyle = 'outlined';

    ripple = true;

    public courseList = [
        {name: 'Intro lesson', number: 0},
        {name: '1 Saying Hello!', number: 1},
        {name: '2 Hey! What\'s up?', number: 2},
        {name: '3 Las get acquainted', number: 3},
        {name: '4 Let me introduce myself', number: 4},
        {name: '5 Meeting people', number: 5},
        {name: '6 More people to know', number: 6},
        {name: '7 Family and friends ', number: 7},
        {name: '8 Et More relatives?', number: 8},
        {name: '9 Same or different', number: 9},
        {name: '10 More in common', number: 10},
        {name: '11 Food you have', number: 11},
        {name: '12 Grab a bite', number: 12},
        {name: '13 Home sweet home', number: 13},
        {name: '14 No place like home', number: 14},
        {name: '15 A day in a life', number: 15},
        {name: '16 Just another day', number: 16},
        {name: '17 Leisure activities', number: 17},
        {name: '18 When you\'re free', number: 18},
        {name: '19 Personal profile', number: 19},
        {name: '20 More about you ', number: 20},
        {name: '21 Feel good', number: 21},
        {name: '22 Get emotional', number: 22},
        {name: '23 Events', number: 23},
        {name: '24 More occasions', number: 24},
        {name: '25 Technology', number: 25},
        {name: '26 For the geeks', number: 26},
        {name: '27 Health Care', number: 27},
        {name: '28 Feeling well', number: 28},
        {name: '29 Celebration', number: 29},
        {name: '30 More to celebrate', number: 30},
        {name: '31 History', number: 31},
        {name: '32 Past', number: 32},
        {name: '33 Inventions', number: 33},
        {name: '34 Innovations', number: 34},
        {name: '35 Weather', number: 35},
        {name: '36 More about weather', number: 36},
        {name: '37 Dreams', number: 37},
        {name: '38 Dreams and ambitions', number: 38},
        {name: '39 Education and careers', number: 39},
        {name: '40 Looming and working', number: 40},
        {name: '41 Transport', number: 41},
        {name: '42 Traffic', number: 42},
        {name: '43 Adventures', number: 43},
        {name: '44 Quests', number: 44},
        {name: '45 Character', number: 45},
        {name: '46 Personality', number: 46},
        {name: '47 Follow the fashion', number: 47},
        {name: '48 Fashion trends', number: 48},
        {name: '49 Culture', number: 49},
        {name: '50 Traditions and customs', number: 50},


    ];

    ngOnInit() {
        this.primengConfig.ripple = true;

    }

}
