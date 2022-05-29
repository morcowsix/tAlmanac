import {ChartColors} from "../views/measurements-chart/measurements-chart.model";
import {Coordinates} from "./coordinates.model";

export interface Measurement {
  type: string
  value: number
  time: string
  coordinates: Coordinates
  symbol: string
  chartColors: ChartColors
}
