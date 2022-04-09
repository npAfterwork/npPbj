import {environment} from '../environments/environment';
import {Component, OnInit} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector:    'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly platform: Platform,
    private readonly statusBar: StatusBar,
    private readonly splashScreen: SplashScreen
  ) {
  }

  ngOnInit() {
    //    this.auth.logout().then(() => console.log('logged out'));
    console.log('APP INIT START');
    this.platform.ready().then(() => {
      console.log('APP PLATFORM READY');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(e => console.error(e));
  }

  noContextMenu(ev: MouseEvent) {
    //    ev.preventDefault();
    if (environment.production) {
      ev.preventDefault();
    }
  }

}
