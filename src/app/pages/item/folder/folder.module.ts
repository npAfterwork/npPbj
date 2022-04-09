import {ComponentsModule} from '../../../components/components.module';
import {RootFoldersGuard} from '../../../guards/root-folders.guard';
import {FolderPage} from './folder.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:        '',
    component:   FolderPage,
    canActivate: [RootFoldersGuard]
  }
];

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
