import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {IonicStorageModule} from "@ionic/storage-angular";
import {Configuration} from "src/@jam/configuration";
import {ApiModule} from "src/@jam/api.module";
import {GraphQLModule} from "src/@graphql/graphql.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function ConfigurationServiceFactory(): Configuration {
  return new Configuration({
    withCredentials: true
  })
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    IonicModule.forRoot(
      {
        mode: 'md',
        hardwareBackButton: true
      }),
    IonicStorageModule.forRoot(
      {
        name: 'pbj',
        dbKey: 'pbj-db',
        storeName: 'pbj-store',
        description: 'Pb&J Data storage'
      }),
    ApiModule.forRoot(
      ConfigurationServiceFactory,
    ),
    GraphQLModule,
    AppRoutingModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
