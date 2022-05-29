import {ChartColors} from "../views/measurements-chart/measurements-chart.model";
import {Measurement} from "./measurement.model";
import {Coordinates} from "./coordinates.model";

export class Temperature implements Measurement {
  type: string = 'Temperature'
  value: number
  time: string
  coordinates: Coordinates
  symbol: string = '℃'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(77,201,67)',
    pointBackgroundColor: 'rgb(22,144,13)',
    borderColor: 'rgb(77,201,67)',
    backgroundColor: 'rgba(77,201,67, 0.30)'
  }

  constructor(value: number, time: string, coordinates: Coordinates) {
    this.value = value;
    this.time = time;
    this.coordinates = coordinates;
  }
}
