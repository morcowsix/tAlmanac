import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {
  private completeAnimation:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public get completeAnimation$(): Observable<boolean> {
    return this.completeAnimation.asObservable()
  }

  public changeState(): void {
    this.completeAnimation.next(!this.completeAnimation.value)
  }

  public setState(state: boolean): void {
    this.completeAnimation.next(state)
  }
}
