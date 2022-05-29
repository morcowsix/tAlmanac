import { Injectable } from '@angular/core';
import * as moment from "moment";
import {MonthSelectorService} from "./month-selector.service";
import {TestData} from "../data/TestData";
import {CalendarDay, CalendarWeek} from "../views/calendar/calendar.model";
import {MeasurementDay} from "../model/MeasurementDay";
import {Temperature} from "../model/Temperature";
import {Pressure} from "../model/Pressure";
import {Humidity} from "../model/Humidity";
import {Measurement} from "../model/measurement.model";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  //TODO This is inject (database) job

  // measurementDays: Readonly<MeasurementDay[]> = TestDataJson.getDataFromJson()
  public measurementDays: Readonly<MeasurementDay[]> = TestData.generateRandomData(30, 10)
  public calendar: CalendarWeek[] = [];

  constructor(private dateService: MonthSelectorService) {
    this.dateService.date.subscribe(this.generateCalendar.bind(this))
  }

  public getDaysWithoutWeeks(): CalendarDay[] {
    return this.calendar.flatMap(w => w.days)
  }

  public findMeasurementDay(value: moment.Moment): MeasurementDay | undefined {
    return this.measurementDays.find((date: MeasurementDay) =>
      //if the number of measure day and month is not equal to processing calendar day then return undefined
      date.number === value.date() && date.month === value.format('MMMM') && date.year === value.year())
  }

  public checkInstanceTemperature(object: any): boolean {
    return object instanceof Temperature
  }

  public checkInstancePressure(object: any): boolean {
    return object instanceof Pressure
  }

  public checkInstanceHumidity(object: any): boolean {
    return object instanceof Humidity
  }

  private generateCalendar(now: moment.Moment): void  {
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
            const common = !now.isSame(value, 'date')
            const avgMeasurements = this.getAvgMeasurementsForDate(value)
            const disabled = avgMeasurements.length == 0
            const monthStart = value.date() == 1

            return {
              value, today, disabled, common, avgMeasurements, monthStart
            }
          })
      })
    }

    this.calendar = calendar
  }

  private getAvgMeasurementsForDate(value: moment.Moment): Measurement[] {
    const foundMeasureDay = this.findMeasurementDay(value)
    return (foundMeasureDay === undefined) ? [] as Measurement[] : foundMeasureDay.avgMeasurements
  }
}
