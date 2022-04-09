import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RootFoldersGuard implements CanActivate {

  async canActivate() {
    console.log('ROOT-FOLDER-GUARD: start');
    // await this.dataService.getIndex('root');
    console.log('ROOT-FOLDER-GUARD: end');
    return true;
  }
}
