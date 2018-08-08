import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  album = "";
  tracks = [];
  loader = false;

  constructor(private _spotify:SpotifyService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.obtenerTracks(params.idalbum);
      this.obtenerInfoAlbum(params.idalbum);
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

  obtenerInfoAlbum(albumId){
    this._spotify.obtenerAlbum(albumId).subscribe((data:any) => {
      this.album = data;
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

  obtenerTracks(albumId){
    this.loader = false;
      this._spotify.obtenerTracksAlbum(albumId).subscribe((data:any) => {
        this.tracks = data.items;
        this.loader = true;
      },
      error => {
        if (error.status == 401){
            this._spotify.renovarToken();
        } 
      })
  }

  ordenarTracksDuracion(){
    
    this.tracks.sort(function (a, b) {
      return a.duration_ms - b.duration_ms;
    });


  }

  guardandoFavorito(id){

    let arrayFavorito = [];

    let favoritos:string = localStorage.getItem("favoritos");

    if (favoritos != null || favoritos != undefined){
      arrayFavorito = JSON.parse(favoritos)
    }

    this._spotify.guardarTrackFavorito(id).subscribe((res:any) => {

      let objTrack = {
        'id': res.id,
        'nombre': res.name,
        'album': res.album.name,
        'url': res.preview_url,
        'artista': res.artists[0].name,
        'imgAlbum': res.album.images[0].url
      }

      arrayFavorito.push(objTrack);

      localStorage.setItem("favoritos", JSON.stringify(arrayFavorito))


    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    });
  }

  esFavorito(id){

    let favoritos = localStorage.getItem("favoritos");

    if (favoritos == undefined){
      return false;
    }

    let arrayFavoritos = JSON.parse(favoritos);

    let encontro = false;
    arrayFavoritos.forEach(element => {

      if (element.id == id){
        encontro = true;
      }
    });


    return encontro;
  }

  quitarFavorito(id){

    let favoritos = localStorage.getItem("favoritos");
    let arrayFavoritos = JSON.parse(favoritos);

    let copia = arrayFavoritos;

    arrayFavoritos.forEach((element, index) => {
      if (element.id == id){
        console.log('encontro');
        copia.splice(index,1);
      }
    });

    localStorage.setItem("favoritos",JSON.stringify(copia));

    return false;
    
  }

}
