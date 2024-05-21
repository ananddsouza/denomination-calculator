import { Pipe, PipeTransform } from '@angular/core';

// PrefixPositivePipe - Pipe which transforms positive numbers with a + prefix
@Pipe({
  name: 'prefixPositive',
})
export class PrefixPositivePipe implements PipeTransform {
  transform(value: number): string {
    if (value > 0) {
      return `+${value}`;
    } else {
      return value.toString();
    }
  }
}
