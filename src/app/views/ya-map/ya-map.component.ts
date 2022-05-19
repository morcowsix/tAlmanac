import {Component, OnInit} from '@angular/core';
import {YaReadyEvent} from "angular8-yandex-maps";
import {AnimationOptions} from "ngx-lottie";
import {YaMapService} from "./ya-map.service";
import {DayDataset, DayPlacemark, Feature, FeatureCollection, MapDataset} from "./ya-map.model";

@Component({
  selector: 'app-ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss'],

})
export class YaMapComponent implements OnInit {
  map?: ymaps.Map
  options: AnimationOptions = {
    path: '/assets/lottie/map_loading_animation.json',
  };

  constructor(private yaMapService: YaMapService) {}

  clustererOptions: ymaps.IClustererOptions = {
    gridSize: 24,
    // clusterDisableClickZoom: true,
    // preset: 'islands#greenClusterIcons',
    clusterIconLayout: 'default#pieChart',
    clusterIconPieChartRadius: 25,
    clusterIconPieChartCoreRadius: 10,
    clusterIconPieChartStrokeWidth: 3,
  };

  objectManagerOptions: ymaps.IObjectManagerOptions = {
    clusterize: true,
    gridSize: 1024,
    maxZoom: 8,
    clusterDisableClickZoom: true,
    // clusterIconLayout: 'default#pieChart',
    showInAlphabeticalOrder: true
  }

  dayPlacemarks: DayPlacemark[] = []
  featureCollections: FeatureCollection[] = []

  ngOnInit(): void {
    // this.createPlacemarks()
    // this.getAverageCoordinates()
    const datasets: MapDataset[][] = this.yaMapService.getCoordinatesForEveryMeasurement()
    this.featureCollections.concat(this.createGeoObjectCollections(datasets))
  }

  private createGeoObjectCollections(datasets: MapDataset[][]): FeatureCollection[] {
    let date: string = ''
    let color: string = ''
    const featureCollections: FeatureCollection[] = []

    datasets.forEach((d) => {
      let index: number = 0
      const features: Feature[] = []
      d.forEach((dataset) => {
        features.push(this.createFeature(index++, dataset))
        date = dataset.date
        color = dataset.color
      })

      this.featureCollections.push({type: "FeatureCollection", features: features, date: date, color: color})
    });
    return featureCollections
  }

  private createPlacemarks() {
    const dayDatasets: DayDataset[] = this.yaMapService.separateCoordinatesByDay()
    dayDatasets.forEach(dayDataset => {
      this.dayPlacemarks.push( this.createDayPlacemark(dayDataset))
    })
  }

  private createDayPlacemark(dayDataset: DayDataset): DayPlacemark {
    let index: number = 0
    const features: Feature[] = []
    dayDataset.timeDatasets.forEach(timeDataset => {
      features.push(this.createFeature(index++, timeDataset))
    })

    return {
      geometry: {type: 'Point', coordinates: dayDataset.coordinates},
      properties: {
        balloonContentHeader: `${dayDataset.date}`,
        balloonContent: `Coordinates: <br> ${dayDataset.coordinates} <br><br> ${dayDataset.balloonContent}`,
        hintContent: `${dayDataset.time} ${dayDataset.date}`
      },
      options: {
        preset: 'islands#circleDotIcon',
        iconColor: dayDataset.color
      },
      timePlacemarks: features
    }
  }

  private createFeature(index: number, dataset: MapDataset): Feature {
    return {
      type: "Feature",
      id: index,
      geometry: {type: 'Point', coordinates: dataset.coordinates},
      properties: {
        balloonContentHeader: `${dataset.time} ${dataset.date}`,
        balloonContent: `Coordinates: <br> ${dataset.coordinates} <br><br> ${dataset.balloonContent}`,
        hintContent: `${dataset.time} ${dataset.date}`
      },
      options: {
        preset: 'islands#icon',
        iconColor: dataset.color
      }
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>) {
    this.map = event.target
  }

  onObjectManagerReady(target : YaReadyEvent<ymaps.ObjectManager>, collection?: FeatureCollection): void {
    const objectManager = target.target
    // target.objects.options.set('preset', 'islands#dotIcon');
    objectManager.clusters.options.set('clusterIconColor', collection?.color)
    objectManager.add(collection ?? [])
  }
}


