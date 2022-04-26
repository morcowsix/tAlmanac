export interface ChartColors {
  pointBorderColor: string
  pointBackgroundColor: string
  borderColor: string
  backgroundColor: string
}

export interface Measurement {
  type: string
  value: number
  time: string
  coordinates: string
  symbol: string
  chartColors: ChartColors
}

export class Temperature implements Measurement {
  type: string = 'Temperature'
  value: number
  time: string;
  coordinates: string;
  symbol: string = '℃'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(77,201,67)',
    pointBackgroundColor: 'rgb(22,144,13)',
    borderColor: 'rgb(77,201,67)',
    backgroundColor: 'rgba(77,201,67, 0.30)'
  }


  constructor(value: number, time: string, coordinates: string) {
    this.value = value;
    this.time = time;
    this.coordinates = coordinates;
  }
}

export class Pressure implements Measurement {
  type: string = 'Pressure'
  value: number
  time: string;
  coordinates: string;
  symbol: string = 'hPa'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(255,214,77)',
    pointBackgroundColor: 'rgb(157,131,47)',
    borderColor: 'rgb(255,214,77)',
    backgroundColor: 'rgba(255,214,77, 0.30)'
  }


  constructor(value: number, time: string, coordinates: string) {
    this.value = value;
    this.time = time;
    this.coordinates = coordinates;
  }
}

export class Humidity implements Measurement {
  type: string = 'Humidity'
  value: number
  time: string;
  coordinates: string;
  symbol: string = 'φ'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(64,114,238)',
    pointBackgroundColor: 'rgb(34,61,128)',
    borderColor: 'rgb(64,114,238)',
    backgroundColor: 'rgba(64,114,238, 0.30)'
  }

  constructor(value: number, time: string, coordinates: string) {
    this.value = value;
    this.time = time;
    this.coordinates = coordinates;
  }
}

export class MeasureDay {
  number: number
  month: string
  year: number
  temperatures: Temperature[];
  pressures: Pressure[];
  humidities: Humidity[];
  avgMeasures: Measurement[]

  constructor(number: number, month: string, year: number,
              temperatures: Temperature[], pressures: Pressure[], humidities: Humidity[]) {
    this.number = number
    this.month = month
    this.year = year
    this.temperatures = temperatures;
    this.pressures = pressures;
    this.humidities = humidities;
    this.avgMeasures = [this.deriveAvg(temperatures), this.deriveAvg(pressures), this.deriveAvg(humidities)]
  }

  getFullDate() {
    return `${this.number} ${this.month} ${this.year}`
  }

  //TODO this is server job
  private deriveAvg(measures: Measurement[]): Measurement {
    const sum = measures.map(m => m.value).reduce(
      (previous, current) => previous + current, 0
    )

    const avgMeasure = (m: Measurement): Measurement => {
      console.log(typeof m)
      m.value = Math.round(sum / measures.length)
      return m
    }

    return avgMeasure(measures[0])
  }

}

