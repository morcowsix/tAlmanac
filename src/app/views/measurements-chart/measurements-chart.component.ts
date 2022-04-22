import {Component, HostBinding, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {TestData} from "../../data/TestData";

const ticksColor: string = '#ADB9D8'
const gridColor: string = '#4E5677'
// const backgroundOpacity: number = 0.30
// const pointBorderColor: string = 'rgb(77,201,67)'
// const pointBackgroundColor: string = 'rgb(22,144,13)'
// const borderColor: string = 'rgb(77,201,67)'
// const backgroundColor = alpha(pointBorderColor, backgroundOpacity)

const tooltipTitlePrefix: string = 'Time: '

@Component({
  selector: 'app-measurements-chart',
  templateUrl: './measurements-chart.component.html',
  styleUrls: ['./measurements-chart.component.scss']
})
export class MeasurementsChartComponent {

  //TODO Need improve objects structure and put in files
  temperatureMeasures = {
    data: TestData.days[0].temperatures.map(t => t.value),
    times: TestData.days[0].times,
    colors: TestData.days[0].temperatures[0].chartColors
  }

  public lineChartLabels = this.temperatureMeasures.times

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartOptions = {
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
            size: 16
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
            size: 16
          },
          padding: 16,
          callback: function(value, index, ticks) {
            return value + '℃';
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
            return 'Temp: ' + tooltipItems.formattedValue + '℃';
          },
          title: function(tooltipItems) {
            return tooltipItems.map(i => tooltipTitlePrefix + i.label );
          }
        }
      }
    }
  }

  public lineChartData = [
    {
      data: this.temperatureMeasures.data,
      backgroundColor: this.temperatureMeasures.colors.backgroundColor,
      borderColor: this.temperatureMeasures.colors.borderColor,
      pointBorderColor: this.temperatureMeasures.colors.pointBorderColor,
      pointBackgroundColor: this.temperatureMeasures.colors.pointBackgroundColor,
      fill: true
    }
  ]

  constructor() { }

}

