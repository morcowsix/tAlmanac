import { Injectable } from '@angular/core';
import {TableRawDataset} from "../measurements-table/measurements-table.component";
import {CalendarService} from "../../service/calendar.service";
import {TableDataService} from "../../service/table-data.service";
import {DayDataset, MapDataset} from "./ya-map.model";
import {MeasurementDay} from "../../model/MeasurementDay";

@Injectable({
  providedIn: 'root'
})
export class YaMapService {
  constructor(private calendarService: CalendarService, private tableDataService: TableDataService) { }

  public getCoordinatesForEveryMeasurement(): MapDataset[][] {
    const datasets: MapDataset[][] = []
    this.calendarService.measurementDays.forEach(day => {
      const dayDataset: MapDataset[] = []
      const tableRawDataset: TableRawDataset[] = this.tableDataService.getTableDataSets(day)
      const dayColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)

      tableRawDataset.forEach(raw => {
        const coordinates = [raw.coordinates.latitude, raw.coordinates.longitude]
        const mapDataset: MapDataset = {
          date: {number: day.number, month: day.month, year: day.year},
          time: raw.time,
          coordinates: coordinates,
          balloonContent: `Temperature: ${raw.temperature} <br> Pressure: ${raw.pressure} <br> Humidity: ${raw.humidity} <br>`,
          color: dayColor
          // color: '#2A3550'
        }

        dayDataset.push(mapDataset)
      })

      datasets.push(dayDataset)
    })

    return datasets
  }

  public separateCoordinatesByDay(): DayDataset[] {
    const dayDatasets: DayDataset[] = []
    this.calendarService.measurementDays.forEach(day => {
      const timeDatasets: MapDataset[] = []
      const tableRawDataset: TableRawDataset[] = this.tableDataService.getTableDataSets(day)
      const dayColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
      const dayDataset: Readonly<DayDataset> = this.deriveDayDataset(tableRawDataset, day, dayColor)

      tableRawDataset.forEach(raw => {
        const coordinates = [raw.coordinates.latitude, raw.coordinates.longitude]
        const dataset: MapDataset = {
          date: {number: day.number, month: day.month, year: day.year},
          time: raw.time,
          coordinates: coordinates,
          balloonContent: `Temperature: ${raw.temperature} <br> Pressure: ${raw.pressure} <br> Humidity: ${raw.humidity} <br>`,
          color: dayColor
        }

        timeDatasets.push(dataset)
      })

      dayDatasets.push({...dayDataset, timeDatasets: timeDatasets})
    })

    return dayDatasets
  }

  private deriveDayDataset(tableRawDataset: TableRawDataset[], day: MeasurementDay, dayColor: string): DayDataset {
    const avgCoordinates = tableRawDataset.map(raw => [raw.coordinates.latitude, raw.coordinates.longitude])
      .reduce((previousValue, currentValue) =>
        [previousValue[0]+currentValue[0], previousValue[1]+currentValue[1]])
      .map(value => value/tableRawDataset.length)

    return {
      timeDatasets: [],
      date: {number: day.number, month: day.month, year: day.year},
      coordinates: avgCoordinates,
      balloonContent: `
                          Avg. Temperature: ${day.avgMeasurements[0].value}
                          <br>
                          Avg. Pressure: ${day.avgMeasurements[1].value}
                          <br>
                          Avg. Humidity: ${day.avgMeasurements[2].value}
                          <br>
                        `,
      color: dayColor
    }
  }

  public getAverageCoordinates(): MapDataset[][] {
    const datasets: MapDataset[][] = []
    this.calendarService.measurementDays.forEach(day => {
      const dayDataset: MapDataset[] = []
      const tableRawDataset: TableRawDataset[] = this.tableDataService.getTableDataSets(day)
      const dayColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)

      const avgCoordinates = tableRawDataset.map(raw => [raw.coordinates.latitude, raw.coordinates.longitude])
        .reduce((previousValue, currentValue) =>
          [previousValue[0]+currentValue[0], previousValue[1]+currentValue[1]])
        .map(value => value/tableRawDataset.length)

      const mapDataset: MapDataset = {
        date: {number: day.number, month: day.month, year: day.year},
        coordinates: avgCoordinates,
        balloonContent: `
                          Avg. Temperature: ${day.avgMeasurements[0].value}
                          <br>
                          Avg. Pressure: ${day.avgMeasurements[1].value}
                          <br>
                          Avg. Humidity: ${day.avgMeasurements[2].value}
                          <br>
                        `,
        color: dayColor
      }

      dayDataset.push(mapDataset)
      datasets.push(dayDataset)
    })

    return datasets
  }
}
