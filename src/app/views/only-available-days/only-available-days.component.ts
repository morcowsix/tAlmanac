import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../../service/calendar.service";
import {MeasurementDay} from "../../model/MeasurementDay";
import {OnlyAvailableDaysService} from "../../service/only-available-days.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Year} from "./only-available-days.model";

@Component({
  selector: 'app-only-available-days',
  templateUrl: './only-available-days.component.html',
  styleUrls: ['./only-available-days.component.scss']
})
export class OnlyAvailableDaysComponent implements OnInit {

  currentYear: Year

  constructor(public calendarService: CalendarService,
              private availableDaysService: OnlyAvailableDaysService,
              private dialog: MatDialog) {
    availableDaysService.currentYear.subscribe(value => this.currentYear = value)
  }

  public ngOnInit(): void {}

  public openDialog(day: MeasurementDay): void {
    let dialogRef = this.dialog.open(DialogComponent)
    let instance = dialogRef.componentInstance
    instance.clickedDay = day
  }

}
