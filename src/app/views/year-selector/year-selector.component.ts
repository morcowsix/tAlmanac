import { Component, OnInit } from '@angular/core';
import {OnlyAvailableDaysService} from "../../service/only-available-days.service";

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit {

  //TODO improve css design:
  // -css file of component duplicate another css file it's not good
  // -common style enchants
  // -make disable pointer when achieved edge of array
  // -fix grid CSS item height (now items of others months have different height, especially - May)

  year: string

  constructor(public availableDaysService: OnlyAvailableDaysService) {
    availableDaysService.currentYear.subscribe(value => this.year = value.name)
  }

  ngOnInit(): void {
  }

  changeYear(direction: number) {
    this.availableDaysService.changeCurrentYear(direction)
  }

}
