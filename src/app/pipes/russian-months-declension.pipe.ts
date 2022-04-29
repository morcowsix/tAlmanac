import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ruMonthDeclension'
})
export class RussianMonthsDeclensionPipe implements PipeTransform {

  months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  transform(month: string): string {
    return (month === month[2] || month === month[7]) ? month.slice(0, -1)+'а' : month.slice(0, -1)+'я'
  }

}
