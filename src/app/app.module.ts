import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

/*RUTAS*/
import { FeatureRoutingModule } from "./app-routing.module";

import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SetTokenComponent } from './components/set-token/set-token.component';
import { ImgArtistPipe } from './pipes/img-artist.pipe';
import { AlbumsComponent } from './components/albums/albums.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { TrackComponent } from './components/track/track.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtistListComponent,
    HomeComponent,
    NavbarComponent,
    SetTokenComponent,
    ImgArtistPipe,
    AlbumsComponent,
    TracksComponent,
    FechaPipe,
    LoaderComponent,
    SearchComponent,
    CardComponent,
    TrackComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    FeatureRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
