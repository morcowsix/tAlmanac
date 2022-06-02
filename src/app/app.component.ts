import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {moveFromLeft, moveFromRight} from "ngx-router-animations";
import {AppRoutingService} from "./app-routing.service";

//TODO change russian words on english everywhere

const routeAnimations = [
  trigger('moveFromRight',  [
    transition('calendar => *', useAnimation(moveFromRight)),
    transition('measurement => map', useAnimation(moveFromRight))
  ]),
  trigger('moveFromLeft',  [
    transition('map => *', useAnimation(moveFromLeft)),
    transition('measurement => calendar', useAnimation(moveFromLeft))
  ])
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: routeAnimations
})
export class AppComponent {

  constructor(public readonly appRoutingService: AppRoutingService) {}

  public getState(outlet: any): any {
    return outlet.activatedRouteData.state;
  }
}


