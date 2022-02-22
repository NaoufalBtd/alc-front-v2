import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

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

    constructor(private primengConfig: PrimeNGConfig, translate: TranslateService) {
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }


}
