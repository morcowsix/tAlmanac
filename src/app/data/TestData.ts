import {MeasureDay, Humidity, Pressure, Temperature} from "../model/MeasureDay";

export class TestData {

  static days: MeasureDay[] = [
    new MeasureDay(
      18,
      'апрель',
      2022,
      [
        new Temperature(-9, '03:24', {latitude: 62.52084968, longitude: 172.3650415}),
        new Temperature(-1, '10:30', {latitude: 6.466968332, longitude: -2.84971815}),
        new Temperature(8, '14:40', {latitude: -42.414464991, longitude: -124.12068037}),
        new Temperature(15, '15:52', {latitude: 2.50857943, longitude: -85.015141761}),
        new Temperature(10, '22:40', {latitude: 85.48177991, longitude: 99.177266776}),
        new Temperature(2, '23:59', {latitude: -8.796422837, longitude: 164.919311821})
      ] as Temperature[],
      [
        new Pressure(420, '03:24', {latitude: 62.52084968, longitude: 172.3650415}),
        new Pressure(720, '10:30', {latitude: 6.466968332, longitude: -2.84971815}),
        new Pressure(790, '14:40', {latitude: -42.414464991, longitude: -124.12068037}),
        new Pressure(615, '15:52', {latitude: 2.50857943, longitude: -85.015141761}),
        new Pressure(551, '22:40', {latitude: 85.48177991, longitude: 99.177266776}),
        new Pressure(722, '23:59', {latitude: -8.796422837, longitude: 164.919311821}),
      ] as Pressure[],
      [
        new Humidity(62, '03:24', {latitude: 62.52084968, longitude: 172.3650415}),
        new Humidity(65, '10:30', {latitude: 6.466968332, longitude: -2.84971815}),
        new Humidity(67, '14:40', {latitude: -42.414464991, longitude: -124.12068037}),
        new Humidity(77, '15:52', {latitude: 2.50857943, longitude: -85.015141761}),
        new Humidity(60, '22:40', {latitude: 85.48177991, longitude: 99.177266776}),
        new Humidity(24, '23:59', {latitude: -8.796422837, longitude: 164.919311821}),
      ] as Humidity[]
    ),
    new MeasureDay(
      19,
      'май',
      2022,
      [
        new Temperature(-7, '06:12', {latitude: 67.043669757, longitude: -19.948693374}),
        new Temperature(2, '12:33', {latitude:19.53111973, longitude: 89.802604750}),
        new Temperature(17, '12:44', {latitude:-18.04723390, longitude: -88.273840316}),
        new Temperature(17, '15:59', {latitude:40.67810521, longitude: 20.527521135}),
        new Temperature(12, '20:22', {latitude:74.086845487, longitude: -125.356701468}),
        new Temperature(-12, '22:31', {latitude:-19.997442946, longitude: -36.62551822})
      ] as Temperature[],
      [
        new Pressure(750, '06:12', {latitude: 67.043669757, longitude: -19.948693374}),
        new Pressure(793, '12:33', {latitude:19.53111973, longitude: 89.802604750}),
        new Pressure(477, '12:44', {latitude:-18.04723390, longitude: -88.273840316}),
        new Pressure(681, '15:59', {latitude:40.67810521, longitude: 20.527521135}),
        new Pressure(455, '20:22', {latitude:74.086845487, longitude: -125.356701468}),
        new Pressure(515, '22:31', {latitude:-19.997442946, longitude: -36.62551822}),
      ] as Pressure[],
      [
        new Humidity(34, '06:12', {latitude: 67.043669757, longitude: -19.948693374}),
        new Humidity(30, '12:33', {latitude:19.53111973, longitude: 89.802604750}),
        new Humidity(34, '12:44', {latitude:-18.04723390, longitude: -88.273840316}),
        new Humidity(57, '15:59', {latitude:40.67810521, longitude: 20.527521135}),
        new Humidity(11, '20:22', {latitude:74.086845487, longitude: -125.356701468}),
        new Humidity(66, '22:31', {latitude:-19.997442946, longitude: -36.62551822})
      ] as Humidity[]
    ),
  ]
}



