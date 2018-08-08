import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SpotifyService } from "../../services/spotify.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.css']
})
export class SetTokenComponent implements OnInit {

  constructor(private _spotify: SpotifyService,
              private router:Router,
              private location:Location) { }

  ngOnInit() {

    let token = "";

    let URLactual = window.location;
    let resultado = URLactual.hash.split('&', 2);
    token = resultado[0].substr(14);

    if (token.length > 0){

      localStorage.setItem("token", token);

      //this.location.back();

      this.router.navigate(['/'])

      
    }

  }

}
