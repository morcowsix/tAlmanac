import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../../service/calendar.service";
import {MeasurementDay} from "../../model/MeasurementDay";
import {OnlyAvailableDaysService} from "../../service/only-available-days.service";

//TODO move to model and maybe find better name
export interface Month {
  name: string
  days: MeasurementDay[]
}

export interface Year {
  name: string
  months: Month[]
}

@Component({
  selector: 'app-only-available-days',
  templateUrl: './only-available-days.component.html',
  styleUrls: ['./only-available-days.component.scss']
})
export class OnlyAvailableDaysComponent implements OnInit {

  currentYear: Month[]

  constructor(public calendarService: CalendarService,
              private availableDaysService: OnlyAvailableDaysService) {
    availableDaysService.currentYear.subscribe(value => this.currentYear = value.months)
  }

  ngOnInit(): void {}
}
