import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  @Input() favoritos;

  constructor() { }

  ngOnInit() {
  }

}
