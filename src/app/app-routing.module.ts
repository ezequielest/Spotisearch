import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { ArtistListComponent } from "./components/artist-list/artist-list.component";
import { SetTokenComponent } from "./components/set-token/set-token.component";
import { AlbumsComponent } from "./components/albums/albums.component";
import { TracksComponent } from "./components/tracks/tracks.component";

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'artist/:search', component: ArtistListComponent },
    { path: 'artist/:id/albums', component: AlbumsComponent },
    { path: 'artist/:id/albums/:idalbum/tracks', component: TracksComponent },
    { path: 'set-token', component: SetTokenComponent},
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
