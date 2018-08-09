import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  artista = "";
  artistaId = "";
  albums = [];
  loader = false;
  sinFoto = "http://admin.shoppingweb.es/imagen_productos/sinFoto.png";

  constructor(private _spotify:SpotifyService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.obtenerAlbunes(params.id);
      this.obtenerArtista(params.id);
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

  obtenerAlbunes(artistaId){
    this.loader = false;
    return this._spotify.buscarAlbunesArtista(artistaId).subscribe((data:any) => {
      this.albums = data.items;
      this.loader = true;
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    });
  }

  obtenerArtista(artistaId){
    return this._spotify.obtenerArtista(artistaId).subscribe((data:any)=>{
      this.artistaId = data.id;
      this.artista = data;
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

  obtenerTracks(id){
    this.router.navigate(['artist/'+ this.artistaId +'/albums/'+ id +'/tracks']);
  }

}
