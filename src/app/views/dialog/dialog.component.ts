import {Component, OnInit} from '@angular/core';
import {MeasurementDay} from "../../model/MeasurementDay";
import {ChartDataService} from "../../service/chart-data.service";
import {ChartDataset} from "../measurements-chart/measurements-chart.component";
import {DateService, Date} from "../../service/date.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //TODO add close dialog button to right top corner

  public clickedDay: MeasurementDay
  public clickedDayFullDate: string
  public chartDatasets: ChartDataset[]

  constructor(private readonly chartDataService: ChartDataService,
              private readonly dateService: DateService) { }

  public ngOnInit(): void {
    this.chartDatasets = this.chartDataService.getChartDatasets(this.clickedDay)
    this.clickedDayFullDate = this.getClickedDayFullDate()
  }

  private getClickedDayFullDate(): string {
    const date: Date = {
      number: this.clickedDay.number,
      month: this.clickedDay.month,
      year: this.clickedDay.year
    }
    return this.dateService.declensionDate(date)
  }


}
