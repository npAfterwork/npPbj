import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {GraphQLModule} from "src/@graphql/graphql.module";
import {TipOfTheDayService} from "src/app/services/tip-of-the-day/tip-of-the-day.service";
import {StorageService} from "src/app/services/storage/storage.service";

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
