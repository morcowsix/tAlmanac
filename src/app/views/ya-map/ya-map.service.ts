import { Injectable } from '@angular/core';
import {CalendarService} from "../../service/calendar.service";
import {TableDataService} from "../../service/table-data.service";
import {DayPlacemarkDataset, TimePlacemarkDataset} from "./ya-map.model";
import {MeasurementDay} from "../../model/MeasurementDay";
import {TableRawDataset} from "../measurements-table/measurements-table.model";

@Injectable({
  providedIn: 'root'
})
export class YaMapService {

  constructor(private readonly calendarService: CalendarService,
              private readonly tableDataService: TableDataService) { }

  public separateCoordinatesByDay(): DayPlacemarkDataset[] {
    const dayDatasets: DayPlacemarkDataset[] = []
    this.calendarService.measurementDays.forEach(day => {
      const timeDatasets: TimePlacemarkDataset[] = []
      const tableRawDataset: TableRawDataset[] = this.tableDataService.getTableDataSets(day)
      const dayColor = this.randomizeColor()
      const dayDataset: Readonly<DayPlacemarkDataset> = this.deriveDayDataset(tableRawDataset, day, dayColor)

      tableRawDataset.forEach(raw => {
        const coordinates = [raw.coordinates.latitude, raw.coordinates.longitude]
        const dataset: TimePlacemarkDataset = {
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

  private randomizeColor(): string {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
  }

  private deriveDayDataset(tableRawDataset: TableRawDataset[], day: MeasurementDay, dayColor: string): DayPlacemarkDataset {
    const avgCoordinates = this.deriveAvgCoordinates(tableRawDataset)

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

  private deriveAvgCoordinates(tableRawDataset: TableRawDataset[]) {
    return tableRawDataset.map(raw => [raw.coordinates.latitude, raw.coordinates.longitude])
      .reduce((previousValue, currentValue) =>
        [previousValue[0] + currentValue[0], previousValue[1] + currentValue[1]])
      .map(value => value / tableRawDataset.length);
  }
}
