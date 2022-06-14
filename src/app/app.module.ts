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
import {MomentPipe} from "./pipes/moment.pipe";
import { MonthSelectorComponent } from './views/month-selector/month-selector.component';
import { DialogComponent } from './views/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MeasurementsTableComponent } from './views/measurements-table/measurements-table.component';
import { MeasurementsChartComponent } from './views/measurements-chart/measurements-chart.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { CoordinatesPipe } from './pipes/coordinates.pipe';
import { HeaderComponent } from './views/header/header.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { OnlyAvailableDaysComponent } from './views/only-available-days/only-available-days.component';
import { SortDaysAscendingPipe } from './pipes/sort-days-ascending.pipe';
import { RussianMonthsDeclensionPipe } from './pipes/russian-months-declension.pipe';
import { YearSelectorComponent } from './views/year-selector/year-selector.component';
import {MatDividerModule} from "@angular/material/divider";
import { YaMapComponent } from './views/ya-map/ya-map.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import {DecimalPipe} from "@angular/common";
import { DataGeneratorComponent } from './views/data-generator/data-generator.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MeasureBoxComponent } from './views/measure-box/measure-box.component';
export function playerFactory() {return player;}

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MomentPipe,
    MonthSelectorComponent,
    DialogComponent,
    MeasurementsTableComponent,
    MeasurementsChartComponent,
    SidebarComponent,
    CoordinatesPipe,
    HeaderComponent,
    OnlyAvailableDaysComponent,
    SortDaysAscendingPipe,
    RussianMonthsDeclensionPipe,
    YearSelectorComponent,
    YaMapComponent,
    DataGeneratorComponent,
    MeasureBoxComponent
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
    NgChartsModule,
    MatSlideToggleModule,
    MatDividerModule,
    AngularYandexMapsModule,
    MatProgressSpinnerModule,
    [LottieModule.forRoot({player: playerFactory})],
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    DecimalPipe,
    RussianMonthsDeclensionPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
