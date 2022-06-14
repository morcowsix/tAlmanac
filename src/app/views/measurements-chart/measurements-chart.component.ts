import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions, ChartType} from "chart.js";
import {ChartDataset} from "./measurements-chart.model";

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

  constructor(private readonly elementRef: ElementRef) { }

  public ngOnInit(): void {
    const ticksColor: string = this.getColorVariableFromCss('--light-color')
    const gridColor: string = this.getColorVariableFromCss('--background-color')
    const tooltipTitlePrefix: string = 'Time: '
    const tooltipDataPrefix: string = this.dataset.type.slice(0, 4) + ': '
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
          cubicInterpolationMode: 'monotone',
          tension: 0.4
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
          backgroundColor:  this.getColorVariableFromCss('--background-color'),
          titleColor: this.getColorVariableFromCss('--light-color'),
          bodyColor: this.getColorVariableFromCss('--light-color'),
          displayColors: false,
          bodyFont: {
            weight: '600'
          },
          callbacks: {
            label: function(tooltipItems) {
              return tooltipDataPrefix + tooltipItems.formattedValue + ' ' + valueSymbol;
            },
            title: function(tooltipItems) {
              return tooltipItems.map(i => tooltipTitlePrefix + i.label );
            }
          }
        }
      }
    }
  }

  private getColorVariableFromCss(property: string): string {
    return getComputedStyle(this.elementRef.nativeElement).getPropertyValue(property);
  }

}

