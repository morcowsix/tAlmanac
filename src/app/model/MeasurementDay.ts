import {Temperature} from "./Temperature";
import {Pressure} from "./Pressure";
import {Humidity} from "./Humidity";
import {Measurement} from "./measurement.model";

export class MeasurementDay {
  number: number
  month: string
  year: number
  temperatures: Temperature[]
  pressures: Pressure[]
  humidities: Humidity[]
  avgMeasurements: Measurement[]

  constructor(number: number, month: string, year: number,
              temperatures: Temperature[], pressures: Pressure[], humidities: Humidity[]) {
    this.number = number
    this.month = month
    this.year = year
    this.temperatures = temperatures
    this.pressures = pressures
    this.humidities = humidities
    this.avgMeasurements = [
      this.deriveAvgMeasurement(temperatures),
      this.deriveAvgMeasurement(pressures),
      this.deriveAvgMeasurement(humidities)
    ]
  }

  public static fromJsonFactory(obj: any): MeasurementDay {
    return new MeasurementDay(
      obj.number, obj.month, obj.year,
      obj.temperatures.map((t: Temperature) => new Temperature(t.value, t.time, t.coordinates)),
      obj.pressures.map((p: Pressure) => new Pressure(p.value, p.time, p.coordinates)),
      obj.humidities.map((h: Humidity) => new Humidity(h.value, h.time, h.coordinates))
    )
  }

  //TODO this is server job
  private deriveAvgMeasurement(measures: Measurement[]): Measurement {
    const sum = measures.map(m => m.value).reduce(
      (previous, current) => previous + current, 0
    )

    const avgMeasure = (m: Measurement): Measurement => {
      m.value = Math.round(sum / measures.length)
      return m
    }

    return avgMeasure(measures[0])
  }

}

