import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";
import { Router, ActivatedRoute } from "@angular/router";
import { empty } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _spotify:SpotifyService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  login(){
    console.log('click');
    this._spotify.login().subscribe(data => { console.log(data)},
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

  buscarArtista(busqueda){
    if (busqueda != ""){
     this.router.navigate(['/artist', busqueda])
    }
  }

  tengoQueOcultar(){

    this.activatedRoute.params.subscribe(par => {

        if (par != empty || par.artist != undefined){
          return true;
        }else{
          return false;
        }
    },
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    });
    
  }

}
