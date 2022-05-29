import {ChartColors} from "../views/measurements-chart/measurements-chart.model";
import {Measurement} from "./measurement.model";
import {Coordinates} from "./coordinates.model";

export class Humidity implements Measurement {
  type: string = 'Humidity'
  value: number
  time: string;
  coordinates: Coordinates;
  symbol: string = 'φ'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(64,114,238)',
    pointBackgroundColor: 'rgb(34,61,128)',
    borderColor: 'rgb(64,114,238)',
    backgroundColor: 'rgba(64,114,238, 0.30)'
  }

  constructor(value: number, time: string, coordinates: Coordinates) {
    this.value = value;
    this.time = time;
    this.coordinates = coordinates;
  }
}
