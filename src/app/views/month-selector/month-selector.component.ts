import {Component} from '@angular/core';
import {MonthSelectorService} from "../../service/month-selector.service";

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent {

  //TODO make same right and left arrows pointers as in year selector (mat-icon-button)

  constructor(public dateService: MonthSelectorService) { }

  changeMonth(direction: number) {
    this.dateService.changeMonth(direction)
  }
}
