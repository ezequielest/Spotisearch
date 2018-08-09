import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: '[app-track]',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() track;

  constructor(private _spotify:SpotifyService) { }

  ngOnInit() {
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

}
