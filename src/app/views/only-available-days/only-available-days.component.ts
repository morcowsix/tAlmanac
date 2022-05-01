import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../../service/calendar.service";
import {MeasurementDay} from "../../model/MeasurementDay";

//TODO move to model and maybe find better name
export interface Month {
  name: string
  days: MeasurementDay[]
}

//TODO move to another place, for instance: model
const monthsTemplate = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

@Component({
  selector: 'app-only-available-days',
  templateUrl: './only-available-days.component.html',
  styleUrls: ['./only-available-days.component.scss']
})
export class OnlyAvailableDaysComponent implements OnInit {

  year: Month[] = []

  constructor(public calendarService: CalendarService) { }

  ngOnInit(): void {
    monthsTemplate.forEach(m => {
      const month: Month = {name: m, days: (this.calendarService.measurementDays.filter(d => m === d.month))}
      if (month.days.length > 0) this.year.push(month)
    })
  }

}
