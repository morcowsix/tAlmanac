import {Component, OnInit} from '@angular/core';
import {MeasurementDay} from "../../model/MeasurementDay";
import {ChartDataService} from "../../service/chart-data.service";
import {ChartDataset} from "../measurements-chart/measurements-chart.component";



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //TODO add close dialog button to right top corner

  clickedDay: MeasurementDay
  chartDatasets: ChartDataset[]

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.chartDatasets = this.chartDataService.getChartDatasets(this.clickedDay)
  }

}
