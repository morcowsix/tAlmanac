import { Injectable } from '@angular/core';
import {Month, Year} from "../views/only-available-days/only-available-days.component";
import moment from "moment";
import {MeasurementDay} from "../model/MeasurementDay";
import {CalendarService} from "./calendar.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OnlyAvailableDaysService {

  years: Year[]
  currentYear: BehaviorSubject<Year>

  constructor(private calendarService: CalendarService) {
    const measurements = this.calendarService.measurementDays
    this.years = this.splitByYears(measurements).sort((a, b) => a.name < b.name ? -1 : 1)
    this.currentYear = new BehaviorSubject<Year>(this.deriveCurrentYear())
  }

  changeCurrentYear(direction: number) {
    const newIndex = this.years.indexOf(this.currentYear.value)+direction

    if (newIndex < this.years.length && newIndex >= 0)
      this.currentYear.next(this.years[newIndex])
  }

  private deriveCurrentYear(): Year {
    const currentYear = moment().format('YYYY')
    return this.years.find(y => y.name === currentYear) ?? {name: '', months: []}
  }

  private splitByYears(measurements: ReadonlyArray<MeasurementDay>): Year[] {
    const years: Year[] = []
    let iterableArray = Array.from(measurements)

    while (iterableArray.length > 0) {
      const pickedYear: number = iterableArray[0].year
      const pickedYearMeasurements = iterableArray.filter(d => pickedYear === d.year)
      const sortedByMonthPickedYear = this.sortMeasurementsByMonth(pickedYearMeasurements);
      years.push({name: pickedYear.toString(), months: sortedByMonthPickedYear})
      iterableArray = iterableArray.filter(d => !pickedYearMeasurements.includes(d))
    }
    return years
  }

  private sortMeasurementsByMonth(measurements: ReadonlyArray<MeasurementDay>): Month[] {
    //TODO move to another place, for instance: model
    const monthsTemplate = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

    const year: Month[] = []

    monthsTemplate.forEach(m => {
      const month: Month = {name: m, days: (measurements.filter(d => m === d.month))}
      if (month.days.length > 0) year.push(month)
    })

    return year
  }
}
