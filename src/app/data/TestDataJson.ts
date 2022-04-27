import jsondata from "src/assets/test-data.json"
import {MeasurementDay} from "../model/MeasurementDay";


export class TestDataJson {

  static getDataFromJson(): MeasurementDay[] {
    const dataArray: MeasurementDay[] = []
    jsondata.forEach(e => dataArray.push(MeasurementDay.fromJsonFactory(e)))
    return dataArray
  }

}
