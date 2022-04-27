import { Pipe, PipeTransform } from '@angular/core';
import {Coordinates} from "../model/MeasurementDay";

@Pipe({
  name: 'coordinates'
})
export class CoordinatesPipe implements PipeTransform {

  transform(coordinates: Coordinates): string {
    const latitude = coordinates.latitude.toFixed(4)
    const longitude = coordinates.longitude.toFixed(4)
    return `${latitude}, ${longitude}`;
  }

}
