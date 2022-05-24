import {Component, Input, OnInit} from '@angular/core';
import {Coordinates, MeasurementDay} from "../../model/MeasurementDay";
import {TableDataService} from "../../service/table-data.service";

//TODO move to model
export interface TableRawDataset {
  time: string,
  temperature: number,
  pressure: number,
  humidity: number,
  coordinates: Coordinates
}

//TODO make coordinate icon in table clickable and guiding to map component with appropriate coordinates placemark

@Component({
  selector: 'app-measurements-table',
  templateUrl: './measurements-table.component.html',
  styleUrls: ['./measurements-table.component.scss']
})
export class MeasurementsTableComponent implements OnInit {

  @Input() clickedDay: MeasurementDay
  tableRaws: TableRawDataset[]

  constructor(private tableDataService: TableDataService) { }

  ngOnInit(): void {
    this.tableRaws = this.tableDataService.getTableDataSets(this.clickedDay)
  }

}
