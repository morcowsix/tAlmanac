import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YaMapComponent} from "./views/ya-map/ya-map.component";
import {CalendarComponent} from "./views/calendar/calendar.component";
import {MeasurementsTableComponent} from "./views/measurements-table/measurements-table.component";

const routes: Routes = [
  {path: '', component: MeasurementsTableComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'map', component: YaMapComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
