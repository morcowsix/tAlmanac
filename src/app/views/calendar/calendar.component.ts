import {Component, OnInit} from '@angular/core';
import 'moment/locale/ru'
import {MatDialog} from '@angular/material/dialog'
import {DialogComponent} from "../dialog/dialog.component";
import {CalendarService} from "../../service/calendar.service";
import {MeasurementDay} from "../../model/MeasurementDay";
import {CalendarDay} from "./calendar.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  checked = false;

  constructor(public readonly calendarService: CalendarService,
              private readonly dialog: MatDialog) { }

  public ngOnInit(): void {}

  public changeToggle(): void {
    this.checked = !this.checked
  }

  public openDialog(disabled: boolean, day: CalendarDay): void {
    if (!disabled) {
      let dialogRef = this.dialog.open(DialogComponent)
      let instance = dialogRef.componentInstance
      instance.clickedDay = this.calendarService.findMeasurementDay(day.value) ?? MeasurementDay.prototype
    }
  }

}
