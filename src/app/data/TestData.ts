import {MeasureDay, Humidity, Pressure, Temperature} from "../model/MeasureDay";

export class TestData {

  static days: MeasureDay[] = [
    new MeasureDay(
      18,
      'апрель',
      2022,
      [
        new Temperature(-9, '03:24', '62.52084968, 172.3650415'),
        new Temperature(-1, '10:30', '6.466968332, -2.84971815'),
        new Temperature(8, '14:40', '-42.414464991, -124.12068037'),
        new Temperature(15, '15:52', '2.50857943, -85.015141761'),
        new Temperature(10, '22:40', '85.48177991, 99.177266776'),
        new Temperature(2, '23:59', '-8.796422837, 164.919311821')
      ] as Temperature[],
      [
        new Pressure(420, '03:24', '62.52084968, 172.3650415'),
        new Pressure(720, '10:30', '6.466968332, -2.84971815'),
        new Pressure(790, '14:40', '-42.414464991, -124.12068037'),
        new Pressure(615, '15:52', '2.50857943, -85.015141761'),
        new Pressure(551, '22:40', '85.48177991, 99.177266776'),
        new Pressure(722, '23:59', '-8.796422837, 164.919311821'),
      ] as Pressure[],
      [
        new Humidity(62, '03:24', '62.52084968, 172.3650415'),
        new Humidity(65, '10:30', '6.466968332, -2.84971815'),
        new Humidity(67, '14:40', '-42.414464991, -124.12068037'),
        new Humidity(77, '15:52', '2.50857943, -85.015141761'),
        new Humidity(60, '22:40', '85.48177991, 99.177266776'),
        new Humidity(24, '23:59', '-8.796422837, 164.919311821'),
      ] as Humidity[]
    ),
    new MeasureDay(
      19,
      'май',
      2022,
      [
        new Temperature(-7, '06:12', '67.043669757, -19.948693374'),
        new Temperature(2, '12:33', '19.53111973, 89.802604750'),
        new Temperature(17, '12:44', '-18.04723390, -88.273840316'),
        new Temperature(17, '15:59', '40.67810521, 20.527521135'),
        new Temperature(12, '20:22', '74.086845487, -125.356701468'),
        new Temperature(-12, '22:31', '-19.997442946, -36.62551822')
      ] as Temperature[],
      [
        new Pressure(750, '06:12', '67.043669757, -19.948693374'),
        new Pressure(793, '12:33', '19.53111973, 89.802604750'),
        new Pressure(477, '12:44', '-18.04723390, -88.273840316'),
        new Pressure(681, '15:59', '40.67810521, 20.527521135'),
        new Pressure(455, '20:22', '74.086845487, -125.356701468'),
        new Pressure(515, '22:31', '-19.997442946, -36.62551822'),
      ] as Pressure[],
      [
        new Humidity(34, '06:12', '67.043669757, -19.948693374'),
        new Humidity(30, '12:33', '19.53111973, 89.802604750'),
        new Humidity(34, '12:44', '-18.04723390, -88.273840316'),
        new Humidity(57, '15:59', '40.67810521, 20.527521135'),
        new Humidity(11, '20:22', '74.086845487, -125.356701468'),
        new Humidity(66, '22:31', '-19.997442946, -36.62551822')
      ] as Humidity[]
    ),
  ]


    // new MeasureDay(19, 'май',  new Temperature(24), new Pressure(660), new Humidity(33)),
    // new MeasureDay(21, 'апрель', new Temperature(-3), new Pressure(711), new Humidity(65)),
    // new MeasureDay(22, 'май',  new Temperature(11), new Pressure(785), new Humidity(23)),
    // new MeasureDay(25, 'апрель',  new Temperature(-11), new Pressure(423), new Humidity(81)),
}



