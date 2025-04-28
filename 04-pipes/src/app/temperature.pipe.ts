import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number,
    inputType: 'C' | 'F',
    outputType?: 'C' | 'F'
  ): string {
    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    if (inputType === 'F' && outputType === 'F') {
      return val.toFixed(2) + ' °F';
    }
    if (inputType === 'C' && outputType === 'F') {
      return (val * (9 / 5) + 32).toFixed(2) + ' °F';
    }
    if (inputType === 'F' && outputType === 'C') {
      return ((val - 32) * (5 / 9)).toFixed(2) + ' °C';
    }
    return val.toFixed(2) + ' °C';
  }
}
