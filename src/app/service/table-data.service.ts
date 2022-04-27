import {Injectable} from '@angular/core';
import {Coordinates, Humidity, MeasurementDay} from "../model/MeasurementDay";
import {TableRawDataset} from "../views/measurements-table/measurements-table.component";

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  getTableDataSets(measurementDay: MeasurementDay): TableRawDataset[] {
    let tableRaws: TableRawDataset[] = []

    for (let i = 0; i < measurementDay.temperatures.length; i++) {
      let temperature = measurementDay.temperatures[i]
      let pressure = measurementDay.pressures[i]
      let humidity: Humidity = measurementDay.humidities[i]
      let time: string = TableDataService.compareProperties(temperature, pressure, humidity, 'time')
      let coordinates: Coordinates =
        TableDataService.compareObjects([temperature.coordinates, pressure.coordinates, humidity.coordinates])
          ? temperature.coordinates : {latitude: 0, longitude: 0}

      tableRaws.push({time: time, temperature: temperature.value, pressure: pressure.value,
        humidity: humidity.value, coordinates: coordinates
      })
    }

    return tableRaws
  }

  private static compareProperties(temperature: any, pressure: any, humidity: any, property: string): string {
    return (temperature[property] === pressure[property] && temperature[property] === humidity[property]) ? temperature[property] : ''
  }

  private static compareObjects<T>(objArray: T[]): boolean {
    return objArray.every(element => {
      return JSON.stringify(element) === JSON.stringify(objArray[0])
    })
  }
}
