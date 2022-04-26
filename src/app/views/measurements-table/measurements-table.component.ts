import {Component, Input, OnInit} from '@angular/core';
import {Coordinates, MeasureDay} from "../../model/MeasureDay";
import {TableDataService} from "../../service/table-data.service";

export interface TableRawDataset {
  time: string,
  temperature: number,
  pressure: number,
  humidity: number,
  coordinates: Coordinates
}

@Component({
  selector: 'app-measurements-table',
  templateUrl: './measurements-table.component.html',
  styleUrls: ['./measurements-table.component.scss']
})
export class MeasurementsTableComponent implements OnInit {

  @Input() clickedDay: MeasureDay
  tableRaws: TableRawDataset[]

  constructor(private tableDataService: TableDataService) { }

  ngOnInit(): void {
    this.tableRaws = this.tableDataService.getTableDataSets(this.clickedDay)
  }

}
