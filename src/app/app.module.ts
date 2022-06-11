import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedModule } from './authorized/authorized.module';
import { LandingComponent } from './components/landing/landing.component';
import { ContributeProblemModule } from './contribute-problem/contribute-problem.module';
import { CoreModule } from './core/core.module';
import { ManageContributionsModule } from './manage-contributions/manage-contributions.module';
import { ProblemsModule } from './problems/problems.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserModule,
    CommonModule,
    AuthorizedModule,
    ContributeProblemModule,
    BrowserAnimationsModule,
    ManageContributionsModule,
    ProblemsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081/auth',
        realm: 'PPOCode',
        clientId: 'bachelors-online-coding'
      },
      initOptions: {
        pkceMethod: 'S256',
        flow: 'standard',
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}