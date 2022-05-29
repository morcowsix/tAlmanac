import {MeasurementDay} from "../../model/MeasurementDay";

export interface Month {
  name: string
  days: MeasurementDay[]
}

export interface Year {
  name: string
  months: Month[]
}
