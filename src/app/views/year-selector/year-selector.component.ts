import { Component, OnInit } from '@angular/core';
import {OnlyAvailableDaysService} from "../../service/only-available-days.service";
import {Year} from "../only-available-days/only-available-days.model";

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {

  public year: Year
  public rightPointerEnd: boolean = false
  public leftPointerEnd: boolean = false

  constructor(public availableDaysService: OnlyAvailableDaysService) {
    availableDaysService.currentYear.subscribe(value => this.year = value)
    availableDaysService.currentIndex.subscribe(value => {
      this.leftPointerEnd = value === 0
      this.rightPointerEnd = value === availableDaysService.years.length-1
    })
  }

  public ngOnInit(): void {}

  public changeYear(direction: number): void {
    this.availableDaysService.changeCurrentYear(direction)
  }

}
