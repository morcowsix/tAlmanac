import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  //TODO finish light them: mb styles.scss material theming

  private darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor() { }

  public get darkMode$(): Observable<boolean> {
    return this.darkMode.asObservable()
  }

  public setState(state: boolean): void {
    this.darkMode.next(state)
  }

  public changeState(): void {
    this.darkMode.next(!this.darkMode.value)
  }
}
