import {Component, OnInit} from '@angular/core';
import {ChartColors, MeasureDay} from "../../model/MeasureDay";



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public clickedDay: MeasureDay
  charDatasets: [
    temperature: {type: string, symbol: string, data: number[], times: string[], colors: ChartColors},
    pressure: {type: string, symbol: string, data: number[], times: string[], colors: ChartColors},
    humidity: {type: string, symbol: string, data: number[], times: string[], colors: ChartColors}
  ]

  constructor() { }

  ngOnInit(): void {
    this.charDatasets =
       [{
        type: this.clickedDay.temperatures[0].type,
        symbol: this.clickedDay.temperatures[0].symbol,
        data: this.clickedDay.temperatures.map(t => t.value),
        times: this.clickedDay.temperatures.map(t => t.time),
        colors: this.clickedDay.temperatures[0].chartColors
      },
      {
        type: this.clickedDay.pressures[0].type,
        symbol: this.clickedDay.pressures[0].symbol,
        data: this.clickedDay.pressures.map(t => t.value),
        times: this.clickedDay.pressures.map(t => t.time),
        colors: this.clickedDay.pressures[0].chartColors
      },
      {
        type: this.clickedDay.humidities[0].type,
        symbol: this.clickedDay.humidities[0].symbol,
        data: this.clickedDay.humidities.map(t => t.value),
        times: this.clickedDay.humidities.map(t => t.time),
        colors: this.clickedDay.humidities[0].chartColors
      }]
  }

}
