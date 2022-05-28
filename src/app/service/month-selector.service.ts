import {Injectable} from "@angular/core";
import * as moment from 'moment'
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MonthSelectorService {
  public readonly date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())

  public changeMonth(direction: number): void {
    const value = this.date.value.add(direction, 'month')
    this.date.next(value)
  }
}
