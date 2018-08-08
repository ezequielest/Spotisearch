import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artista;
  //url = "../../assets/img/354.jpeg";
  arrayFavoritos = [];

  constructor(private _spotify:SpotifyService,
              private router:Router) { }

  ngOnInit() {

    let favoritos = localStorage.getItem("favoritos");

    this.arrayFavoritos = JSON.parse(favoritos);
  }

  buscarArtista(busqueda){
    if (busqueda != ""){
      this.router.navigate(['/artist', busqueda])
    }
  }

}
