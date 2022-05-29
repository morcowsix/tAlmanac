import * as moment from "moment";
import {Measurement} from "../../model/measurement.model";

export interface CalendarDay {
  value: moment.Moment
  today: boolean
  disabled: boolean
  common: boolean
  avgMeasurements: Measurement[]
  monthStart: boolean
}

export interface CalendarWeek {
  days: CalendarDay[]
}
