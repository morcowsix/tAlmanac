import {Component, OnInit} from '@angular/core';
import {DateService} from "../../service/date.service";
import * as moment from "moment";
import 'moment/locale/ru'
import {MeasurementDay, Humidity, Pressure, Temperature, Measurement} from "../../model/MeasurementDay";
import {MatDialog} from '@angular/material/dialog'
import {DialogComponent} from "../dialog/dialog.component";
import {TestDataJson} from "../../data/TestDataJson";

interface CalendarDay {
  value: moment.Moment
  today: boolean
  disabled: boolean
  selected: boolean
  avgMeasurements: Measurement[]
  monthStart: boolean
}

interface Week {
  days: CalendarDay[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[] = [];
  //TODO This is inject (database) job

  // measureDays = TestData.generateRandomData(6, 6)
  measurementDays = TestDataJson.getDataFromJson()

  constructor(private dateService: DateService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
    console.log(typeof this.measurementDays[0].number)
  }

  openDialog(disabled: boolean, day: CalendarDay) {
    if (!disabled) {
      let dialogRef = this.dialog.open(DialogComponent)
      let instance = dialogRef.componentInstance
      instance.clickedDay = this.findMeasurementDay(day.value, this.measurementDays)!
    }
  }

  generate(now: moment.Moment) {
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

  getAvgMeasurementsForDate(value: moment.Moment): Measurement[] {
    const foundMeasureDay = this.findMeasurementDay(value, this.measurementDays)
    return (foundMeasureDay === undefined) ? [] as Measurement[] : foundMeasureDay.avgMeasurements
  }

  findMeasurementDay(value: moment.Moment, measurementDays: MeasurementDay[]): MeasurementDay|undefined {
    return measurementDays.find((date: MeasurementDay) =>
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
