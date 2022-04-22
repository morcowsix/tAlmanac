import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CalendarComponent } from './views/calendar/calendar.component';
import {MomentPipe} from "./views/calendar/moment.pipe";
import { MonthSelectorComponent } from './views/month-selector/month-selector.component';
import { DialogComponent } from './views/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MeasurementsTableComponent } from './views/measurements-table/measurements-table.component';
import { MeasurementsChartComponent } from './views/measurements-chart/measurements-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MomentPipe,
    MonthSelectorComponent,
    DialogComponent,
    MeasurementsTableComponent,
    MeasurementsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatDialogModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
