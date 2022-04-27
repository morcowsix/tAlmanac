import {Component, Input, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions, ChartType} from "chart.js";
import {ChartColors} from "../../model/MeasurementDay";


export interface ChartDataset {
  type: string,
  symbol: string,
  data: number[],
  times: string[],
  colors: ChartColors
}

@Component({
  selector: 'app-measurements-chart',
  templateUrl: './measurements-chart.component.html',
  styleUrls: ['./measurements-chart.component.scss']
})
export class MeasurementsChartComponent implements OnInit{

  @Input() dataset: ChartDataset

  public lineChartLabels: string[];
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions;
  public lineChartData: ChartConfiguration['data']['datasets'];

  constructor() { }

  ngOnInit(): void {
    const ticksColor: string = '#ADB9D8'
    const gridColor: string = '#4E5677'
    const tooltipTitlePrefix: string = 'Time: '
    let valueSymbol = this.dataset.symbol

    this.lineChartLabels = this.dataset.times
    this.lineChartData =
      [{
        data: this.dataset.data,
        backgroundColor: this.dataset.colors.backgroundColor,
        borderColor: this.dataset.colors.borderColor,
        pointBorderColor: this.dataset.colors.pointBorderColor,
        pointBackgroundColor: this.dataset.colors.pointBackgroundColor,
        fill: true
      }]

    this.lineChartOptions = {
      responsive: true,
      elements: {
        line: {
          tension: 0.3
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: ticksColor,
            font: {
              family: "'Roboto', 'sans-serif'",
              size: 10
            }
          }
        },
        y: {
          grid: {
            display: true,
            drawTicks: false,
            color: gridColor,
            lineWidth: 1
          },
          ticks: {
            color: ticksColor,
            font: {
              family: "'Roboto', 'sans-serif'",
              size: 10
            },
            callback: function(value) {
              return value + valueSymbol;
            }
          }
        }
      },
      plugins: {
        tooltip: {
          displayColors: false,
          bodyFont: {
            weight: '600'
          },
          callbacks: {
            label: function(tooltipItems) {
              return 'Temp: ' + tooltipItems.formattedValue + ' ' + valueSymbol;
            },
            title: function(tooltipItems) {
              return tooltipItems.map(i => tooltipTitlePrefix + i.label );
            }
          }
        }
      }
    }
  }

}

