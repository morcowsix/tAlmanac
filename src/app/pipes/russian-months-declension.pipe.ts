import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ruMonthDeclension'
})
export class RussianMonthsDeclensionPipe implements PipeTransform {

  months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  transform(month: string): string {
    return (month === this.months[2] || month === this.months[8]) ? month+'а' : month.slice(0, -1)+'я'
  }

}
