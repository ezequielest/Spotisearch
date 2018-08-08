import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    let fecha = new Date(value);
    console.log(fecha)
    return fecha.getFullYear() ;
  }

}
