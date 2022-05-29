import {Coordinates} from "../../model/coordinates.model";


export interface TableRawDataset {
  time: string,
  temperature: number,
  pressure: number,
  humidity: number,
  coordinates: Coordinates
}
