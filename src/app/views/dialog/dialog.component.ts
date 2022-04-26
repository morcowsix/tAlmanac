import {Component, OnInit} from '@angular/core';
import {MeasureDay} from "../../model/MeasureDay";
import {ChartDataService} from "../../service/chart-data.service";
import {ChartDataset} from "../measurements-chart/measurements-chart.component";



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  clickedDay: MeasureDay
  chartDatasets: ChartDataset[]

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.chartDatasets = this.chartDataService.getChartDatasets(this.clickedDay)
  }

}
