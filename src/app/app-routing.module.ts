import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./views/calendar/calendar.component";
import {OnlyAvailableDaysComponent} from "./views/only-available-days/only-available-days.component";
import {YaMapComponent} from "./views/ya-map/ya-map.component";

const routes: Routes = [
  {path: '', redirectTo: 'calendar', pathMatch: 'full'},
  {path: 'measurements', component: OnlyAvailableDaysComponent, data: {state: 'measurement'}},
  {path: 'calendar', component: CalendarComponent, data: {state: 'calendar'}},
  {path: 'map', component: YaMapComponent, data: {state: 'map'}}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
