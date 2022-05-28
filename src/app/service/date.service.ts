import { Injectable } from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {RussianMonthsDeclensionPipe} from "../pipes/russian-months-declension.pipe";
import {MeasurementDay} from "../model/MeasurementDay";

export type Date = Pick<MeasurementDay, "number" | "month" | "year">

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private readonly decimalPipe: DecimalPipe,
    private readonly russianMonthDeclensionPipe: RussianMonthsDeclensionPipe
  ) { }

  public declensionDate = (date: Date): string => {
    return `${this.transformToTwoDigitsBeforePoint(date.number)}
            ${this.declineMonth(date.month)}
            ${date.year}`
  }

  private transformToTwoDigitsBeforePoint(number: number): string {
    return this.decimalPipe.transform(number, '2.0-0') ?? ''
  }

  private declineMonth(month: string): string {
    return this.russianMonthDeclensionPipe.transform(month)
  }


}
