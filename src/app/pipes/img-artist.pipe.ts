import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgArtist'
})
export class ImgArtistPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value === undefined){
      return 'http://admin.shoppingweb.es/imagen_productos/sinFoto.png'
    } else{
      return value
    }
  
    /*}else if (value.url === undefined ){
      return 'http://admin.shoppingweb.es/imagen_productos/sinFoto.png'
    }*/

  }

}
