import {MeasureDay, Humidity, Pressure, Temperature} from "../model/MeasureDay";
import {Months} from "../model/Months";

export class TestData {

  static days: MeasureDay[] = [
    new MeasureDay(
      18,
      'апрель',
      2022,
      ["03:24", "10:30", "14:40", "15:52", "22:40", '23:59'],
      [
        new Temperature(-9),
        new Temperature(-1),
        new Temperature(8),
        new Temperature(15),
        new Temperature(10),
        new Temperature(2)],
      [
        new Pressure(420),
        new Pressure(720),
        new Pressure(790),
        new Pressure(615),
        new Pressure(551),
        new Pressure(722),
      ],
      [
        new Humidity(62),
        new Humidity(65),
        new Humidity(67),
        new Humidity(77),
        new Humidity(60),
        new Humidity(24),
      ]
    ),
    new MeasureDay(
      19,
      'май',
      2022,
      ["06:12", "12:33", "12:44", "15:59", "20:22", '22:31'],
      [
        new Temperature(-7),
        new Temperature(2),
        new Temperature(17),
        new Temperature(17),
        new Temperature(12),
        new Temperature(-12)],
      [
        new Pressure(750),
        new Pressure(793),
        new Pressure(477),
        new Pressure(681),
        new Pressure(455),
        new Pressure(515),
      ],
      [
        new Humidity(34),
        new Humidity(30),
        new Humidity(34),
        new Humidity(57),
        new Humidity(11),
        new Humidity(66),
      ]
    ),
  ]


    // new MeasureDay(19, 'май',  new Temperature(24), new Pressure(660), new Humidity(33)),
    // new MeasureDay(21, 'апрель', new Temperature(-3), new Pressure(711), new Humidity(65)),
    // new MeasureDay(22, 'май',  new Temperature(11), new Pressure(785), new Humidity(23)),
    // new MeasureDay(25, 'апрель',  new Temperature(-11), new Pressure(423), new Humidity(81)),
}



