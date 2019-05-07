import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToSN'
})
export class BoolToSNPipe implements PipeTransform {
  transform(value: boolean): string { return value ? 'Si' : 'No'; }
}
