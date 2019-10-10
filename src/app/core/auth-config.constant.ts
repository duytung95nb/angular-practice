import { AuthConfig } from 'angular-oauth2-oidc';


export const authConfig: AuthConfig = {
    clientId: 'angular_practice',
    redirectUri: 'http://localhost:4200',
    loginUrl: 'http://localhost:3000/auth/login',
    issuer: 'http://localhost:3000',
    scope: 'profile email',
    responseType: 'token'
} 