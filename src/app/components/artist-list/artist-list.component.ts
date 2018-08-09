import { Component, OnInit } from '@angular/core';

import { SpotifyService } from "../../services/spotify.service";
import { ActivatedRoute } from "@angular/router";

import { Router } from "@angular/router";


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artistas:any;
  busqueda;
  loader = false;
  sinFoto = "http://admin.shoppingweb.es/imagen_productos/sinFoto.png";

  constructor(private _spotify:SpotifyService,
              private activatedRoute:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      this.buscarArtista(params.search)
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

  buscar(busqueda){
    if (busqueda != ""){
      this.buscarArtista(busqueda);
    }
  }

  buscarArtista(busqueda){
    this.loader = false;
    this.busqueda = busqueda;
    this._spotify.buscarArtista(busqueda).subscribe(
      (data:any) => { 

        this.artistas = data.artists.items
        this.loader = true;
      },
      error => {
        if (error.status == 401){
            this._spotify.renovarToken();
        } 
      }
    );
  }

  obtenerAlbums(artistaId){
    this.router.navigate(['/artist', artistaId, 'albums'])
  }

  
}
