import { Pipe, PipeTransform } from '@angular/core';
import { ValueTypes } from '../models/recipe';

@Pipe({
  name: 'valueType'
})
export class ValueTypePipe implements PipeTransform {

  transform(value: string, valueType: number): string {
    const lastChar = value[value.length - 1];
    let isSingles = lastChar == '1';
    let isOverTwo = lastChar == '2' || lastChar == '3' || lastChar == '4';

    switch(valueType) {
      case ValueTypes.Any:
        return 'по вкусу';
      case ValueTypes.Weight:
        return `${value} гр`
      case ValueTypes.Volume:
        return `${value} мл`
      case ValueTypes.Count:
        return `${value} шт`
      case ValueTypes.Spoons:
        if (isSingles) {
          return `${value} ложка`;
        } else if (isOverTwo) {
          return `${value} ложки`;
        } else {
          return `${value} ложек`;
        }
      default:
        return `${value}`;
    }
  }

}
