import { Pipe, PipeTransform } from '@angular/core';
import {MeasurementDay} from "../model/MeasurementDay";
import * as moment from "moment";

@Pipe({
  name: 'sortDaysAsc'
})
export class SortDaysAscendingPipe implements PipeTransform {

  months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  transform(days: MeasurementDay[]): MeasurementDay[] {
    const sortingArray: MeasurementDay[] = [];
    days.forEach(val => sortingArray.push(val))

    return sortingArray.sort(
      (a, b): number => {
        const aDate = [a.year, this.months.indexOf(a.month), a.number]
        const bDate = [b.year, this.months.indexOf(b.month), b.number]

        return moment(aDate).diff(moment(bDate))
      }
    )
  }
}
