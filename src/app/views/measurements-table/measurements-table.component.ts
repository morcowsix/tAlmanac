import {Component, Input, OnInit} from '@angular/core';
import {MeasurementDay} from "../../model/MeasurementDay";
import {TableDataService} from "../../service/table-data.service";
import {TableRawDataset} from "./measurements-table.model";
import {YaMapService} from "../ya-map/ya-map.service";
import {Router} from "@angular/router";
import {Coordinates} from "../../model/coordinates.model";
import {MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-measurements-table',
  templateUrl: './measurements-table.component.html',
  styleUrls: ['./measurements-table.component.scss']
})
export class MeasurementsTableComponent implements OnInit {

  @Input() clickedDay: MeasurementDay
  public tableRaws: TableRawDataset[]

  constructor(private readonly tableDataService: TableDataService,
              private readonly yaMapService: YaMapService,
              private readonly router: Router,
              private readonly dialogRef: MatDialogRef<DialogComponent>
  ) { }

  public ngOnInit(): void {
    this.tableRaws = this.tableDataService.getTableDataSets(this.clickedDay)
  }

  public onCoordinatesIconClick(coordinates: Coordinates): void {
    this.router.navigate(['/map'], {
      queryParams: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        zoom: 10
      }
    })
    this.dialogRef.close()
  }

}
