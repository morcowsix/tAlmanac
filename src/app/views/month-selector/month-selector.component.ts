import { Component, OnInit } from '@angular/core';
import {DateService} from "../../service/date.service";

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent {

  constructor(public dateService: DateService) { }

  changeMonth(direction: number) {
    this.dateService.changeMonth(direction)
  }
}
