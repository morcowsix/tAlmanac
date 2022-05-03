import { Component, OnInit } from '@angular/core';
import {OnlyAvailableDaysService} from "../../service/only-available-days.service";
import {Year} from "../only-available-days/only-available-days.component";

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {

  //TODO improve css design:
  // -css file of component duplicate another css file it's not good
  // -common style enchants
  // -fix grid CSS item height (now items of others months have different height, especially - May)

  year: Year
  rightPointerEnd: boolean = false
  leftPointerEnd: boolean = false

  constructor(public availableDaysService: OnlyAvailableDaysService) {
    availableDaysService.currentYear.subscribe(value => this.year = value)
    availableDaysService.currentIndex.subscribe(value => {
      this.leftPointerEnd = value === 0
      this.rightPointerEnd = value === availableDaysService.years.length-1
    })
  }

  ngOnInit(): void {
  }

  changeYear(direction: number) {
    this.availableDaysService.changeCurrentYear(direction)
  }

}
