import {Component} from '@angular/core';
import {DateService} from "../../service/date.service";

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent {

  //TODO make same right and left arrows pointers as in year selector (mat-icon-button)

  constructor(public dateService: DateService) { }

  changeMonth(direction: number) {
    this.dateService.changeMonth(direction)
  }
}
