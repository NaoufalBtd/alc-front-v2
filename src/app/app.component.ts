import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                private router: Router,
                private messageService: MessageService,
                public translate: TranslateService) {

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
        this.translate.setDefaultLang('en');
        this.translate.use('ar');
    }

    goToLogin() {
        this.messageService.clear('newAccount');
        this.router.navigate(['/public/login']);
    }

    onForgetPassword() {
        this.messageService.clear('newAccount');
        this.router.navigate(['/resetPassword']);
    }
}
