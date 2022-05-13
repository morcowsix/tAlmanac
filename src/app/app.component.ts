import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {moveFromRight} from "ngx-router-animations";

//TODO change russian words on english everywhere

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moveFromRight',  [ transition('* => *', useAnimation(moveFromRight))])
  ]
})
export class AppComponent {
  getState(outlet: any)  {
    return outlet.activatedRouteData.state;
  }
}


