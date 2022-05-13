import {ApplicationRef, Component, OnInit} from '@angular/core';
import {CalendarService} from "../../service/calendar.service";
import {TableDataService} from "../../service/table-data.service";
import {TableRawDataset} from "../measurements-table/measurements-table.component";
import {YaReadyEvent} from "angular8-yandex-maps";
import {AnimationOptions, BMCompleteLoopEvent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

interface Placemark {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}

interface GeoObjectConstructor {
  feature: ymaps.IGeoObjectFeature;
  options: ymaps.IGeoObjectOptions;
}

export interface MapDataset {
  coordinates: number[]
  date: string
  time: string
  balloonContent: string
  color: string
}

@Component({
  selector: 'app-ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss'],
  // animations: [
  //   trigger('rollIn', [
  //     state('start', style({})),
  //     state('end', style({})),
  //     transition('start => end', useAnimation(zoomIn))
  //   ]),
  //   // trigger('fadeOut', [transition('* => *', useAnimation(fadeOut))]),
  // ]

})
export class YaMapComponent implements OnInit {
  rollIn: any
  fadeOut: any

  mapAnimationState = 'start'
  mapIsReady: boolean = false

  loadingAnimation?: AnimationItem
  map?: ymaps.Map
  animationComplete: boolean = false
  options: AnimationOptions = {
    path: '/assets/lottie/map_loading_animation.json',
  };

  constructor(private calendarService: CalendarService,
              private tableDataService: TableDataService,
              ) { }

  clustererOptions: ymaps.IClustererOptions = {
    gridSize: 84,
    // clusterDisableClickZoom: true,
    // preset: 'islands#greenClusterIcons',
    clusterIconLayout: 'default#pieChart',
    // Radius of the diagram, in pixels.
    clusterIconPieChartRadius: 25,
    // The radius of the central part of the layout.
    clusterIconPieChartCoreRadius: 10,
    // Width of the sector dividing lines and diagram outline.
    clusterIconPieChartStrokeWidth: 3,
  };

  placemarks: Placemark[] = [];
  datas: MapDataset[][] = []
  clusters: Placemark[][] = []
  polylines: GeoObjectConstructor[] = []
  dataset = this.getCord()


  ngOnInit(): void {
    this.datas.forEach((d) => {
      d.forEach(dataset => {
        this.placemarks.push({
          geometry: dataset.coordinates,
          properties: {
            balloonContentHeader: `${dataset.time} ${dataset.date}`,
            balloonContent: `${dataset.coordinates} <br><br> ${dataset.balloonContent}`,
            hintContent: `${dataset.time} ${dataset.date}`
          },
          options: {
            preset: 'islands#dotIcon',
            iconColor: dataset.color
          }
        });
      })
    });
  }

  getCord(): MapDataset[] {
    const data: MapDataset[] = []

    this.calendarService.measurementDays.forEach(day => {
      const tableRawDataset: TableRawDataset[] = this.tableDataService.getTableDataSets(day)

      const dayCoordinates: number[][] = []
      const dayColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)

      tableRawDataset.forEach(raw => {
        const coordinates = [raw.coordinates.latitude, raw.coordinates.longitude]
        const mapDataset: MapDataset = {
          date: day.getFullDate(),
          time: raw.time,
          coordinates: coordinates,
          balloonContent: `Temperature: ${raw.temperature} <br> Pressure: ${raw.pressure} <br> Humidity: ${raw.humidity} <br>`,
          color: dayColor
        }

        data.push(mapDataset)
        dayCoordinates.push(coordinates)
      })

      this.datas.push(data)
      // this.polylines.push(this.createPolyline(dayCoordinates, dayColor))
    })

    return data
  }

  private createPolyline(coordinates: number[][], color: string): GeoObjectConstructor {
    return {
      feature: {
        geometry: {
          // The "Polyline" geometry type.
          type: 'LineString',
          // Specifying the coordinates of the vertices of the polyline.
          coordinates: coordinates,
        },
        properties: {
          /**
           * Describing the properties of the geo object.
           *  The contents of the balloon.
           */
          balloonContent: 'Polyline',
        },
      },
      options: {
        /**
         * Setting options for the geo object. Disabling the close button on a balloon.
         *
         */
        balloonCloseButton: false,
        // The line color.
        strokeColor: color,
        // Line width.
        strokeWidth: 4,
        // The transparency coefficient.
        strokeOpacity: 0.5,
      },
    };
  }

  animationCreated(event: AnimationItem) {
    // event.playSpeed = 2
    // event.loop = 3
    // event.autoplay = false

    this.loadingAnimation = event
  }

  loopComplete(event: BMCompleteLoopEvent) {
    // this.animationComplete = true
    // this.ref.tick()
    // this.loadingAnimation?.destroy()
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>) {
    this.map = event.target

    this.mapIsReady = true
    this.mapAnimationState = 'end'
  }

  animate() {
    this.mapAnimationState = this.mapAnimationState === 'end' ? 'start' : 'end'
  }
}


