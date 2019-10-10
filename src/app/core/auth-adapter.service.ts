import { Injectable } from "@angular/core";
import { OAuthService, LoginOptions } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config.constant';


@Injectable({
    providedIn: 'root'
})
export class AuthAdapterService {
    constructor(private oAuthService: OAuthService) {
        this.oAuthService.configure(authConfig);
    }

    // tryLoginCodeFlow() {
    //     return this.oAuthService.tryLoginCodeFlow();
    // }

    // initCodeFlow() {
    //     this.oAuthService.initCodeFlow();
    // }

    tryLogin(options: LoginOptions = null) {
        const urlParts = this.getHashFragmentParams(null);
        const accessToken = urlParts['access_token'];
        if (accessToken) {
            this.store('access_token', accessToken);
            const redirectUri = urlParts['redirect_uri'];
            window.location.href = window.location.origin;
        }
        else {
            const savedAccessToken = this.getFromStore('access_token');
            if(!savedAccessToken) {
                this.oAuthService.initImplicitFlow();
            }
        }
    }
    initImplicitFlow() {
        let url = authConfig.loginUrl +
        '?' +
        '&client_id=' +
        encodeURIComponent(authConfig.clientId) +
        '&redirect_uri=' +
        encodeURIComponent(authConfig.redirectUri) +
        '&scope=' +
        encodeURIComponent(authConfig.scope);
        window.location.href = url;
    }
    
    getHashFragmentParams(customHashFragment) {
        /** @type {?} */
        let hash = customHashFragment || window.location.hash;
        hash = decodeURIComponent(hash);
        if (hash.indexOf('#') !== 0) {
            return {};
        }
        /** @type {?} */
        const questionMarkPosition = hash.indexOf('?');
        if (questionMarkPosition > -1) {
            hash = hash.substr(questionMarkPosition + 1);
        }
        else {
            hash = hash.substr(1);
        }
        return this.parseQueryString(hash);
    }

    parseQueryString(queryString) {
        /** @type {?} */
        const data = {};
        /** @type {?} */
        let pairs;
        /** @type {?} */
        let pair;
        /** @type {?} */
        let separatorIndex;
        /** @type {?} */
        let escapedKey;
        /** @type {?} */
        let escapedValue;
        /** @type {?} */
        let key;
        /** @type {?} */
        let value;
        if (queryString === null) {
            return data;
        }
        pairs = queryString.split('&');
        for (let i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf('=');
            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            }
            else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }
            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);
            if (key.substr(0, 1) === '/') {
                key = key.substr(1);
            }
            data[key] = value;
        }
        return data;
    }

    store(key, value) {
        sessionStorage.setItem(key, value);
    }
    getFromStore(key) {
        return sessionStorage.getItem(key);
    }
}