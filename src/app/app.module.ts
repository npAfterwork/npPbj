import {HttpClient, HttpClientModule} from "@angular/common/http";
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {IonicStorageModule} from "@ionic/storage-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {GraphQLModule} from "src/@graphql/graphql.module";
import {StorageService} from "src/app/services/storage/storage.service";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {TipOfTheDayService} from "./services/tip-of-the-day/tip-of-the-day.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en',
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
    GraphQLModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [StorageService, TipOfTheDayService],
      useFactory: (storage: StorageService, tipOfTheDay: TipOfTheDayService) =>
        async () => {
          await storage.initialize();
          await tipOfTheDay.initialize('pbj.tip-of-the-days');
        }
      ,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
