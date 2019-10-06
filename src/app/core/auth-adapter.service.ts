import { Injectable } from "@angular/core";
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config.constant';


@Injectable({
    providedIn: 'root'
})
export class AuthAdapterService {
    constructor(private oAuthService: OAuthService) {
        this.oAuthService.configure(authConfig);
    }

    tryLoginCodeFlow() {
        return this.oAuthService.tryLoginCodeFlow();
    }

    initCodeFlow() {
        this.oAuthService.initCodeFlow();
    }
}