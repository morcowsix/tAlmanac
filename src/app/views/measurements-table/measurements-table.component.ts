import {Component, Input, OnInit} from '@angular/core';
import {MeasureDay} from "../../model/MeasureDay";

@Component({
  selector: 'app-measurements-table',
  templateUrl: './measurements-table.component.html',
  styleUrls: ['./measurements-table.component.scss']
})
export class MeasurementsTableComponent implements OnInit {

  @Input() clickedDay: MeasureDay

  constructor() { }

  ngOnInit(): void {
  }

}
