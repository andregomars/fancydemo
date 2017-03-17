import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';
import { UIChart } from 'primeng/primeng';

import 'rxjs/add/operator/switchMap';

let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataLocalService } from '../shared/data-local.service';


@Component({
    selector: 'app-analysis-daily',
    templateUrl: './analysis-daily.component.html',
    styleUrls: ['./analysis-daily.component.css']
})
export class AnalysisDailyComponent implements OnInit {

    optionMileageDateRangePicker: IMyOptions;
    dataMileageChart: any;
    optionMileageChart: any;
    vehicleID: string;

    beginDateOfDailyMileage: Date;
    endDateOfDailyMileage: Date;

    @ViewChild("charts")
    charts: ElementRef;
    @ViewChild("chartMileage")
    chartMileage: UIChart;


    constructor(
        private route: ActivatedRoute,
        private dataService: DataLocalService
    ) { }

    ngOnInit(): void {
        this.loadVehicle();
        this.initMilageDateRangePicker();
        this.initMileageChart();
    }

    private loadVehicle(): void {
        this.route.params
            .switchMap((params: Params) => new Array(params["vid"]))
            .subscribe((vid: string) => this.vehicleID = vid);
    }

    private onMileageDateChanged(event: IMyDateRangeModel): void {
        if (event.beginJsDate && event.endJsDate) {
            this.beginDateOfDailyMileage = event.beginJsDate;
            this.endDateOfDailyMileage = event.endJsDate;
            let dataChanged = this.dataService.getVehicleDailyMileage(event.beginJsDate, event.endJsDate);
            this.chartMileage.data.labels = dataChanged.labels;
            this.chartMileage.data.datasets[0].data = dataChanged.data;
            this.chartMileage.refresh();
        }
    }

    private initMilageDateRangePicker(): void {
        this.endDateOfDailyMileage = new Date();
        this.beginDateOfDailyMileage = 
            this.dataService.getDateOfACoupleWeeksAgo(this.endDateOfDailyMileage);
        this.optionMileageDateRangePicker = {
            dateFormat: "mm/dd/yyyy",
            width: "200px",
            height: "23px",
            selectionTxtFontSize: "12px",
            editableDateRangeField: false
        };
    }

    private initMileageChart(): void {
        this.dataMileageChart = this.dataService.getBackwardDaysVehicleDailyMileage(14);
        this.optionMileageChart = {
            responsive: false,
            scales: {
                xAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                        return moment(value).format('MM/DD');
                        }
                    }
                    }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            }
        };
        this.resetChartDefaultOptions(this.optionMileageChart);
    }

    private resetChartDefaultOptions(option: any): void {
        option.animation = { 
            duration: 0 
        };
        option.hover = { 
            animationDuration: 0 
        };
        option.legend = {
            onClick: (e) => e.stopPropagation()
        };
    }


    private exportCharts(): void {
        html2canvas(this.charts.nativeElement, {
            onrendered: function (canvas) {
                const contentDataURL = canvas.toDataURL("image/png");
                let pdf = new jsPDF();
                pdf.addImage(contentDataURL, "PNG", 10, 10);
                pdf.save("Vehicle.DualCharts.pdf");
            }
        })
    }
}
