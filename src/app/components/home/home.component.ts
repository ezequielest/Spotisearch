import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artista;
  arrayFavoritos = [];

  constructor(private _spotify:SpotifyService) { }

  ngOnInit() {

    let favoritos = localStorage.getItem("favoritos");

    this.arrayFavoritos = JSON.parse(favoritos);
  }

}
