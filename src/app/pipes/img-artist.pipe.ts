import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgArtist'
})
export class ImgArtistPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value.images === undefined || value === undefined){
      return 'http://admin.shoppingweb.es/imagen_productos/sinFoto.png'
    }else if (value.images.length == 0){
      return 'http://admin.shoppingweb.es/imagen_productos/sinFoto.png'
    } else{
      return value.images[0].url
    }
  
  }

}
