import {AppGuard} from './guards/app.guard';
import {UserGuard} from './guards/user.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'start', loadChildren: './pages/start/start.module#StartPageModule', canActivate: [AppGuard] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [UserGuard] },

  { path: 'folder/:id', loadChildren: './pages/item/folder/folder.module#FolderPageModule', canActivate: [UserGuard] },
  { path: 'artist/:id', loadChildren: './pages/item/artist/artist.module#ArtistPageModule', canActivate: [UserGuard] },
  { path: 'album/:id', loadChildren: './pages/item/album/album.module#AlbumPageModule', canActivate: [UserGuard] },
  { path: 'playlists/:id', loadChildren: './pages/item/playlist/playlist.module#PlaylistPageModule', canActivate: [UserGuard] },
  { path: 'podcast/:id', loadChildren: './pages/item/podcast/podcast.module#PodcastPageModule', canActivate: [UserGuard] },
  {
    path:        'podcast/:cid/:eid', loadChildren: './pages/item/podcast-episode/podcast-episode.module#PodcastEpisodePageModule',
    canActivate: [UserGuard]
  },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule', canActivate: [UserGuard] },

  { path: 'index/:style/:type', loadChildren: './pages/index/index.module#IndexPageModule', canActivate: [UserGuard] },
  { path: 'list/:style/:type/:list', loadChildren: './pages/list/list.module#ListPageModule', canActivate: [UserGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [UserGuard] },
  { path: 'queue', loadChildren: './pages/queue/queue.module#QueuePageModule', canActivate: [UserGuard] },

  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: '**', redirectTo: '/start', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing:       false,
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
