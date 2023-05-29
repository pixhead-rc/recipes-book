import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursTime'
})
export class HoursTimePipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if(hours !== 0) {
      return `${hours} ч. ${mins} мин.`;
    } else {
      return `${mins} мин.`;
    }
  }

}
