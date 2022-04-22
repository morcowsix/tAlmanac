export interface ChartColors {
  pointBorderColor: string
  pointBackgroundColor: string
  borderColor: string
  backgroundColor: string
}

export interface Measurement {
  value: number
  // time: string
  // coordinates: string
  symbol: string
  chartColors: ChartColors
}

export class Temperature implements Measurement {
  value: number
  symbol: string = '℃'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(206,232,202)',
    pointBackgroundColor: 'rgb(74,119,69)',
    borderColor: 'rgb(206,232,202)',
    backgroundColor: 'rgba(206,232,202, 0.30)'
  }

  constructor(value: number) {
    this.value = value;
  }
}

export class Pressure implements Measurement {
  value: number
  symbol: string = 'hPa'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(77,201,67)',
    pointBackgroundColor: 'rgb(22,144,13)',
    borderColor: 'rgb(77,201,67)',
    backgroundColor: 'rgba(77,201,67, 0.30)'
  }

  constructor(value: number) {
    this.value = value;
  }
}

export class Humidity implements Measurement {
  value: number
  symbol: string = 'φ'
  chartColors: ChartColors = {
    pointBorderColor: 'rgb(77,201,67)',
    pointBackgroundColor: 'rgb(22,144,13)',
    borderColor: 'rgb(77,201,67)',
    backgroundColor: 'rgba(77,201,67, 0.30)'
  }

  constructor(value: number) {
    this.value = value;
  }
}

export class MeasureDay {
  number: number
  month: string
  year: number
  times: string[]
  temperatures: Temperature[];
  pressures: Pressure[];
  humidities: Humidity[];
  avgMeasures: Measurement[]

  constructor(number: number, month: string, year: number, times: string[],
              temperatures: Temperature[], pressures: Pressure[], humidities: Humidity[]) {
    this.number = number
    this.month = month
    this.year = year
    this.times = times
    this.temperatures = temperatures;
    this.pressures = pressures;
    this.humidities = humidities;
    this.avgMeasures = [this.deriveAvg(temperatures), this.deriveAvg(pressures), this.deriveAvg(humidities)]
  }

  //TODO this is server job
  private deriveAvg(measures: Measurement[]): Measurement {
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

