import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, ProgressBarModule, 
        ChartModule, MegaMenuModule, TieredMenuModule } from 'primeng/primeng';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { JustgageModule } from 'angular2-justgage';
import './shared/rxjs-extensions';
import './shared/vendor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DrillComponent } from './drill/drill.component';
import { FleetComponent } from './fleet/fleet.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DataTableComponent } from './fleet/datatable.component';
import { DataCardsComponent } from './fleet/datacards.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressBarComponent } from './components/progressbar/progressbar.component';
import { AgmCoreModule } from '@agm/core';

import { UtilityService } from './shared/utility.service';
import { DataRemoteService } from './shared/data-remote.service';
import { DataService } from './shared/data.service';
import { FleetTrackerService } from './shared/fleet-tracker.service';
import { AnalysisDailyComponent } from './analysis-daily/analysis-daily.component';
import { AnalysisAlertComponent } from './analysis-alert/analysis-alert.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { VehicleDailyLogComponent } from './vehicle-daily-log/vehicle-daily-log.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { FleetSelectionComponent } from './fleet-selection/fleet-selection.component';
import { FleetMapComponent } from './fleet/fleet-map.component';
import { VehicleMapComponent } from './vehicle/vehicle-map.component';

@NgModule({
  declarations: [
    AppComponent,
    DrillComponent,
    FleetComponent,
    VehicleComponent,
    DataTableComponent,
    DataCardsComponent,
    MenuComponent,
    ProgressBarComponent,
    AnalysisDailyComponent,
    AnalysisAlertComponent,
    MonthlyReportComponent,
    VehicleDailyLogComponent,
    DailyReportComponent,
    FleetSelectionComponent,
    FleetMapComponent,
    VehicleMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DataTableModule,
    ProgressBarModule,
    ChartModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    TieredMenuModule,
    MegaMenuModule,
    JustgageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqZcZ_L6UIsGVHcDqWdu-GrsRSPcpWeqU'
    })
  ],
  providers: [
    UtilityService,
    DataRemoteService,
    DataService,
    FleetTrackerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
