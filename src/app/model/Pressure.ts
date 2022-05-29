import {ChartColors} from "../views/measurements-chart/measurements-chart.model";
import {Measurement} from "./measurement.model";
import {Coordinates} from "./coordinates.model";

export class Pressure implements Measurement {
  type: string = 'Pressure'
  value: number
  time: string;
  coordinates: Coordinates;
  symbol: string = 'hPa'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(255,214,77)',
    pointBackgroundColor: 'rgb(157,131,47)',
    borderColor: 'rgb(255,214,77)',
    backgroundColor: 'rgba(255,214,77, 0.30)'
  }


  constructor(value: number, time: string, coordinates: Coordinates) {
    this.value = value;
    this.time = time;
    this.coordinates = coordinates;
  }
}
