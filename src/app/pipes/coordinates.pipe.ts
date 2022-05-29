import { Pipe, PipeTransform } from '@angular/core';
import {Coordinates} from "../model/coordinates.model";

@Pipe({
  name: 'coordinates'
})
export class CoordinatesPipe implements PipeTransform {

  transform(coordinates: Coordinates): string {
    const latitude = coordinates.latitude.toFixed(5)
    const longitude = coordinates.longitude.toFixed(5)
    return `${latitude}, ${longitude}`;
  }

}
