import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent } from "@angular/router";
import { Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  busqueda;
  currentUrl;

  constructor(private _spotify:SpotifyService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private location:Location) {
                
                /*router.events.forEach((event: NavigationEvent) => {
                  if(event instanceof NavigationStart) 
                  {
                      this.currentUrl = event.url;
                      console.log(this.currentUrl);
                      if (this.currentUrl == "/" || this.currentUrl == "/artist/" + this.busqueda){
                        console.log('lo voy a ocultar')
                        let el1 = document.getElementById('navbarSupportedContent');
                        let el2 = document.getElementsByClassName('navbar-toggler');
                        el1.classList.add('hidde');
                        el2[0].classList.add('hidde');
                      }else{
                        console.log('lo voy a ocultar')
                        let el1 = document.getElementById('navbarSupportedContent');
                        let el2 = document.getElementsByClassName('navbar-toggler');
                        el1.classList.remove('hidde');
                        el2[0].classList.remove('hidde');
                      }
                  }
                });*/

               }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(param => {
      console.log(param)
      this.busqueda = param.search;

      this.currentUrl = this.router.url
      console.log(this.currentUrl)

      if (this.currentUrl == "/" || this.currentUrl == "/artist/" + this.busqueda){
        console.log('lo voy a ocultar')
        let el1 = document.getElementById('navbarSupportedContent');
        let el2 = document.getElementsByClassName('navbar-toggler');
        let logo = document.getElementsByClassName('cont-logo');
        el1.classList.add('hidde');
        el2[0].classList.add('hidde');
        logo[0].classList.add('logocentrado')
      }else{
        console.log('lo voy mostrar')
        let el1 = document.getElementById('navbarSupportedContent');
        let el2 = document.getElementsByClassName('navbar-toggler');
        el1.classList.remove('hidde');
        el2[0].classList.remove('hidde');
      }



    })
  }

  login(){
    this._spotify.login().subscribe(data => { console.log(data)},
    error => {
      if (error.status == 401){
          this._spotify.renovarToken();
      } 
    })
  }

}
