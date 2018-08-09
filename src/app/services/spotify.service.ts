import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Md5} from "md5-typescript";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  token = ""

  constructor(private _http:HttpClient) {
    
    let posibleToken = localStorage.getItem("token");
    if (posibleToken != null && posibleToken.length > 0){
      this.token = posibleToken;
    }else{
      this.renovarToken();
    }
  }

  renovarToken(){
    window.location.href="https://accounts.spotify.com/authorize?client_id=08889519b4c24d199dcfa8a0c731c598&redirect_uri=http://localhost:8080/set-token&scope=user-read-private%20user-read-email&response_type=token&state=123"
  }

  setToken(token){
    if (token.lenght == 0){
      return false
    }else{
      this.token = token;
      return true;
    }
  }

  login(){

    let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
    });

    return this._http.get('https://api.spotify.com/v1/me', { headers: headers });
  }

  buscarArtista(artista){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })

    return this._http.get('https://api.spotify.com/v1/search?q=' + artista + '&type=artist', {headers}).pipe(
      map(data => {
        return data
      })
    )
  
  }

  obtenerArtista(artistaId){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })

    return this._http.get('https://api.spotify.com/v1/artists/' + artistaId, {headers}).pipe(
      map(data => {
        return data
      })
    )
  }

  buscarAlbunesArtista(id){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
    
    return this._http.get('https://api.spotify.com/v1/artists/' + id +'/albums', {headers}).pipe(
      map(data => {
        return data
      })
    )

  }

  obtenerTracksAlbum(albumId){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })

    return this._http.get('https://api.spotify.com/v1/albums/' + albumId +'/tracks', {headers}).pipe(
      map(data => {
        return data
      })
    )
  }

  obtenerAlbum(id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })

    return this._http.get('https://api.spotify.com/v1/albums/' + id, {headers}).pipe(
      map(data => {
        return data
      })
    )

  }

  guardarTrackFavorito(trackId){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
    
    return this._http.get('https://api.spotify.com/v1/tracks/'+trackId, {headers}).pipe(
      map(res => {
        return res
      })
    )

  }
  
}
