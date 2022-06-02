import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YaMapComponent} from "./views/ya-map/ya-map.component";
import {CalendarComponent} from "./views/calendar/calendar.component";
import {OnlyAvailableDaysComponent} from "./views/only-available-days/only-available-days.component";

const routes: Routes = [
  {path: '', component: CalendarComponent, data: {state: 'calendar'}},
  {path: 'measurements', component: OnlyAvailableDaysComponent, data: {state: 'measurement'}},
  {path: 'calendar', component: CalendarComponent, data: {state: 'calendar'}},
  {path: 'map', component: YaMapComponent, data: {state: 'map'}}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
