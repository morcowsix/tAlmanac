import {Component} from '@angular/core';
import {MonthSelectorService} from "../../service/month-selector.service";

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent {

  constructor(public dateService: MonthSelectorService) { }

  public changeMonth(direction: number): void {
    this.dateService.changeMonth(direction)
  }
}
