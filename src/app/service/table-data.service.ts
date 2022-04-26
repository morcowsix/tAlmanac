import { Injectable } from '@angular/core';
import {Humidity, MeasureDay} from "../model/MeasureDay";
import {TableRawDataset} from "../views/measurements-table/measurements-table.component";

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  getTableDataSets(measurementDay: MeasureDay): TableRawDataset[] {
    let tableRaws: TableRawDataset[] = []

    for (let i = 0; i < measurementDay.temperatures.length; i++) {
      let temperature = measurementDay.temperatures[i]
      let pressure = measurementDay.pressures[i]
      let humidity: Humidity = measurementDay.humidities[i]
      let time: string = TableDataService.compareProperties(temperature, pressure, humidity, 'time')
      let coordinates:string = TableDataService.compareProperties(temperature, pressure, humidity, 'coordinates')

      tableRaws.push({time: time, temperature: temperature.value, pressure: pressure.value,
        humidity: humidity.value, coordinates: coordinates
      })
    }

    return tableRaws
  }

  private static compareProperties(temperature: any, pressure: any, humidity: any, property: string): string {
    return (temperature[property] === pressure[property] && temperature[property] === humidity[property]) ? temperature[property] : ''
  }
}
