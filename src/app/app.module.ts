import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {RootFoldersGuard} from './guards/root-folders.guard';
import {UserGuard} from './guards/user.guard';
import {JamConfiguration, JamModule} from './jam';
import {LaRndSpinnerModule} from './modules/la-rnd-spinner/la-rnd-spinner.module';
import {PopoverModule} from './popover/popover.module';
import {DataService} from './services/data/data.service';
import {ConfigurationService} from './services/jam/jam.configuration.service';
import {PlayerService} from './services/player/player.service';
import {SettingsService} from './services/settings/settings.service';
import {MessageService} from './services/ui/message.service';
import {UiService} from './services/ui/ui.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {IonicStorageModule} from '@ionic/storage';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {ServiceWorkerModule} from '@angular/service-worker';
import {RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function ConfigurationServiceFactory(service: ConfigurationService): JamConfiguration {
  return service;
}

@NgModule({
  declarations:    [AppComponent],
  entryComponents: [],
  imports:         [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot(
      {
        loader: {
          provide:    TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps:       [HttpClient]
        }
      }),
    IonicModule.forRoot(
      {
        mode:               'md',
        hardwareBackButton: true
      }),
    IonicStorageModule.forRoot(
      {
        name:        'pbj',
        dbKey:       'pbj-db',
        storeName:   'pbj-store',
        description: 'Pb&J Data storage'
      }),
    JamModule.forRoot(
      {
        provide:    JamConfiguration,
        useFactory: ConfigurationServiceFactory,
        deps:       [ConfigurationService]
      }
    ),
    ComponentsModule,
    LaRndSpinnerModule,
    PopoverModule,
    AppRoutingModule
  ],
  providers:       [
    StatusBar,
    SplashScreen,
    MessageService,
    SettingsService,
    UserGuard,
    RootFoldersGuard,
    UiService,
    DataService,
    PlayerService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap:       [AppComponent],
  exports:         []
})
export class AppModule {}
