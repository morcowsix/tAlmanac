import { Injectable } from '@angular/core';
import * as moment from "moment";
import {Humidity, Measurement, MeasurementDay, Pressure, Temperature} from "../model/MeasurementDay";
import {DateService} from "./date.service";
import {TestData} from "../data/TestData";

export interface CalendarDay {
  value: moment.Moment
  today: boolean
  disabled: boolean
  selected: boolean
  avgMeasurements: Measurement[]
  monthStart: boolean
}

export interface CalendarWeek {
  days: CalendarDay[]
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  //TODO This is inject (database) job

  // measurementDays: MeasurementDay[] = TestDataJson.getDataFromJson()
  measurementDays = TestData.generateRandomData(20, 6)
  calendar: CalendarWeek[] = [];

  constructor(private dateService: DateService) {
    this.dateService.date.subscribe(this.generateCalendar.bind(this))
  }

  generateCalendar(now: moment.Moment): void  {
    const startOfMonth = now.clone().startOf('month')
    const startDay = startOfMonth.startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')

    const calendar = []

    while (date.isBefore(endDay) && calendar.length < 6) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const today = moment().isSame(value, 'date') && moment().isSame(value, 'month')
            const selected = !now.isSame(value, 'date')
            const avgMeasurements = this.getAvgMeasurementsForDate(value)
            const disabled = avgMeasurements.length == 0
            const monthStart = value.date() == 1

            return {
              value, today, disabled, selected, avgMeasurements, monthStart
            }
          })
      })
    }

    this.calendar = calendar
  }

  getDaysWithoutWeeks(): CalendarDay[] {
    return this.calendar.flatMap(w => w.days)
  }


  getAvgMeasurementsForDate(value: moment.Moment): Measurement[] {
    const foundMeasureDay = this.findMeasurementDay(value)
    return (foundMeasureDay === undefined) ? [] as Measurement[] : foundMeasureDay.avgMeasurements
  }

  findMeasurementDay(value: moment.Moment): MeasurementDay|undefined {
    return this.measurementDays.find((date: MeasurementDay) =>
      //if the number of measure day and month is not equal to processing calendar day then return undefined
      date.number === value.date() && date.month === value.format('MMMM') && date.year === value.year())
  }

  checkInstanceTemperature(object: any) {
    return object instanceof Temperature
  }

  checkInstancePressure(object: any) {
    return object instanceof Pressure
  }

  checkInstanceHumidity(object: any) {
    return object instanceof Humidity
  }
}
