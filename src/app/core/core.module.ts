import { NgModule, ModuleWithProviders } from "@angular/core";
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [OAuthModule.forRoot(), HttpClientModule],
    providers: [],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        };
    }
}