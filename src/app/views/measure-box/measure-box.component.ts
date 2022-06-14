import {Component, Input, OnInit} from '@angular/core';
import {Measurement} from "../../model/measurement.model";
import {CalendarService} from "../../service/calendar.service";

@Component({
  selector: 'app-measure-box',
  templateUrl: './measure-box.component.html',
  styleUrls: ['./measure-box.component.scss']
})
export class MeasureBoxComponent implements OnInit {

  @Input() public measure: Measurement

  constructor(public readonly calendarService: CalendarService) { }

  public ngOnInit(): void {
  }

}
