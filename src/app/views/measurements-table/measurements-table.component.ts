import {Component, Input, OnInit} from '@angular/core';
import {MeasurementDay} from "../../model/MeasurementDay";
import {TableDataService} from "../../service/table-data.service";
import {TableRawDataset} from "./measurements-table.model";

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
