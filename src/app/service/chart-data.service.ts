import { Injectable } from '@angular/core';
import {MeasurementDay} from "../model/MeasurementDay";
import {ChartDataset} from "../views/measurements-chart/measurements-chart.component";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  getChartDatasets(measurementDay: MeasurementDay): ChartDataset[] {
    return [{
      type: measurementDay.temperatures[0].type,
      symbol: measurementDay.temperatures[0].symbol,
      data: measurementDay.temperatures.map(t => t.value),
      times: measurementDay.temperatures.map(t => t.time),
      colors: measurementDay.temperatures[0].chartColors
    },
      {
        type: measurementDay.pressures[0].type,
        symbol: measurementDay.pressures[0].symbol,
        data: measurementDay.pressures.map(t => t.value),
        times: measurementDay.pressures.map(t => t.time),
        colors: measurementDay.pressures[0].chartColors
      },
      {
        type: measurementDay.humidities[0].type,
        symbol: measurementDay.humidities[0].symbol,
        data: measurementDay.humidities.map(t => t.value),
        times: measurementDay.humidities.map(t => t.time),
        colors: measurementDay.humidities[0].chartColors
      }]
  }
}
