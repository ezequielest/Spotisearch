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

}
