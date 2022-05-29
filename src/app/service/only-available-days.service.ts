import { Injectable } from '@angular/core';
import moment from "moment";
import {MeasurementDay} from "../model/MeasurementDay";
import {CalendarService} from "./calendar.service";
import {BehaviorSubject} from "rxjs";
import {Months} from "../model/Months";
import {Month, Year} from '../views/only-available-days/only-available-days.model';

@Injectable({
  providedIn: 'root'
})
export class OnlyAvailableDaysService {

  public years: Year[]
  public currentYear: BehaviorSubject<Year>
  public currentIndex: BehaviorSubject<number>

  constructor(private calendarService: CalendarService) {
    const measurements = this.calendarService.measurementDays
    this.years = this.splitByYears(measurements).sort((a, b) => a.name < b.name ? -1 : 1)
    this.currentYear = new BehaviorSubject<Year>(this.deriveCurrentYear())
    this.currentIndex = new BehaviorSubject<number>(this.years.indexOf(this.currentYear.value))
  }

  public changeCurrentYear(direction: number): void {
    const newIndex = this.years.indexOf(this.currentYear.value)+direction

    if (newIndex < this.years.length && newIndex >= 0) {
      this.currentYear.next(this.years[newIndex])
      this.currentIndex.next(newIndex)
    }

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
    const year: Month[] = []

    Months.orderedList.forEach(m => {
      const month: Month = {name: m, days: (measurements.filter(d => m === d.month))}
      if (month.days.length > 0) year.push(month)
    })

    return year
  }
}
