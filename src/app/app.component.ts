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
        translate.use('ar');
        // const lang = window.navigator.language;
        // if (lang?.includes('ar')) {
        //     translate.use('ar');
        // } else if (lang?.includes('fr')) {
        //     translate.use('fr');
        // } else {
        //     translate.use('en');
        // }
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

    ngOnInit() {
        this.primengConfig.ripple = true;

    }

}
