import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../controller/service/authentication.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

        if (httpRequest.url.includes(`${this.authenticationService.host}/user/login`)) {
            return httpHandler.handle(httpRequest);
        }
        if (httpRequest.url.includes(`${environment.publicUrl}`)) {
            return httpHandler.handle(httpRequest);
        }

        if (httpRequest.url.includes(`${this.authenticationService.host}/user/register`)) {
            return httpHandler.handle(httpRequest);
        }
        this.authenticationService.loadToken();
        const token = this.authenticationService.getToken();
        const request = httpRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        return httpHandler.handle(request);
    }
}
