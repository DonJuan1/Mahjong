import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailPipe'
})
export class EmailPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    var n = value.indexOf('@');
    var s = value.substring(0, n != -1 ? n : value.length);
    return s;
  }

}
