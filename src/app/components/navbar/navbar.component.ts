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
              private location:Location) {}

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(param => {

      this.busqueda = param.search;
      this.currentUrl = this.router.url

      if (this.currentUrl == "/" || this.currentUrl == "/artist/" + this.busqueda)
      {
        let el1 = document.getElementById('navbarSupportedContent');
        let el2 = document.getElementsByClassName('navbar-toggler');
        let logo = document.getElementsByClassName('cont-logo');
        el1.classList.add('hidde');
        el2[0].classList.add('hidde');
        logo[0].classList.add('logocentrado')
      }else
      {
        let el1 = document.getElementById('navbarSupportedContent');
        let el2 = document.getElementsByClassName('navbar-toggler');
        el1.classList.remove('hidde');
        el2[0].classList.remove('hidde');
      }

    })
  }

}
