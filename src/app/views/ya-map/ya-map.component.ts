import {Component, OnInit} from '@angular/core';
import {YaEvent, YaReadyEvent} from "angular8-yandex-maps";
import {AnimationOptions} from "ngx-lottie";
import {YaMapService} from "./ya-map.service";
import {
  Date,
  DayPlacemark,
  DayPlacemarkDataset,
  Feature,
  FeatureCollection,
  TimePlacemarkDataset
} from "./ya-map.model";
import {RussianMonthsDeclensionPipe} from "../../pipes/russian-months-declension.pipe";
import {DecimalPipe} from "@angular/common";
import IGeoObject = ymaps.IGeoObject;

@Component({
  selector: 'app-ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss'],

})
export class YaMapComponent implements OnInit {
  mapClusterer?: ymaps.Clusterer
  previousZoom: number = 7
  mapZoomOut: boolean = true
  dayPlacemarksMap: Map<ymaps.Placemark, DayPlacemark> = new Map<ymaps.Placemark, DayPlacemark>()
  objectManagersMap: Map<ymaps.ObjectManager, DayPlacemark> = new Map<ymaps.ObjectManager, DayPlacemark>()
  options: AnimationOptions = {
    path: '/assets/lottie/map_loading_animation.json',
  };

  constructor(
    private yaMapService: YaMapService,
    private decimalPipe: DecimalPipe,
    private monthDeclensionPipe: RussianMonthsDeclensionPipe
    ) {}

  clustererOptions: ymaps.IClustererOptions = {
    gridSize: 48,
    clusterIconLayout: 'default#pieChart',
    clusterIconPieChartRadius: 25,
    clusterIconPieChartCoreRadius: 10,
    clusterIconPieChartStrokeWidth: 3,
    hasHint: true
  }

  objectManagerOptions: ymaps.IObjectManagerOptions = {
    clusterize: false
  }

  public dayPlacemarks: DayPlacemark[] = []
  public featureCollections: FeatureCollection[] = []

  //TODO move to special service working with date and separate on methods
  private declensionDate = (date: Date): string => {
    return `${this.decimalPipe.transform(date.number, '2.0-0')}
              ${this.monthDeclensionPipe.transform(date.month)}
              ${date.year}`
  }

  ngOnInit(): void {
    const dataset: DayPlacemarkDataset[] = this.yaMapService.separateCoordinatesByDay()
    this.dayPlacemarks = this.dayPlacemarks.concat(this.createAllGeoObjects(dataset))
  }

  private createAllGeoObjects(dayDatasets: DayPlacemarkDataset[]): DayPlacemark[] {
    const dayPlacemarks: DayPlacemark[] = []
    dayDatasets.forEach(dayDataset => {
      dayPlacemarks.push(this.createDayPlacemark(dayDataset))
    })
    return dayPlacemarks
  }

  private createDayPlacemark(dayDataset: DayPlacemarkDataset): DayPlacemark {
    return {
      geometry: {type: 'Point', coordinates: dayDataset.coordinates},
      properties: {
        balloonContentHeader: this.declensionDate(dayDataset.date),
        balloonContent: this.getDayPlacemarkBalloonContent(dayDataset),
        iconCaption: this.declensionDate(dayDataset.date)
      },
      options: {
        preset: 'islands#circleDotIcon',
        iconColor: dayDataset.color,
        hasBalloon: true,
        balloonPanelMaxMapArea: 0,
        balloonCloseButton: false
      },
      timePlacemarks: this.createTimePlacemarksFromDataset(dayDataset)
    }
  }

  private createTimePlacemarksFromDataset(dayDataset: DayPlacemarkDataset): Feature[] {
    let index: number = 0
    const timePlacemarks: Feature[] = []
    dayDataset.timeDatasets.forEach(timeDataset => {
      timePlacemarks.push(this.createTimePlacemark(index++, timeDataset))
    })
    return timePlacemarks
  }

  private getDayPlacemarkBalloonContent(dayDataset: DayPlacemarkDataset): string {
    return  `
            Coordinates:
            <br>
            ${dayDataset.coordinates[0].toFixed(5)},
            ${dayDataset.coordinates[1].toFixed(5)}
            <br>
            <br>
            ${dayDataset.balloonContent}
            `
  }

  private createTimePlacemark(index: number, timeDataset: TimePlacemarkDataset): Feature {
    return {
      type: "Feature",
      id: index,
      geometry: {type: 'Point', coordinates: timeDataset.coordinates},
      properties: {
        balloonContentHeader: `${timeDataset.time} ${this.declensionDate(timeDataset.date)}`,
        balloonContent: this.getTimePlacemarkBalloonContent(timeDataset),
        hintContent: `${timeDataset.time} ${this.declensionDate(timeDataset.date)}`,
      },
      options: {
        preset: 'islands#dotIcon',
        iconColor: timeDataset.color,
      }
    }
  }

  private getTimePlacemarkBalloonContent(dataset: TimePlacemarkDataset): string {
    return  `
            Coordinates:
            <br>
            ${dataset.coordinates[0].toFixed(5)},
            ${dataset.coordinates[1].toFixed(5)}
            <br>
            <br>
            ${dataset.balloonContent}
            `
  }

  public onClustererReady({target}: YaReadyEvent<ymaps.Clusterer>) {
    this.mapClusterer = target
    this.setClustersHint(target?.getClusters())
  }

  public onObjectManagerReady({target}: YaReadyEvent<ymaps.ObjectManager>, placemark: DayPlacemark): void {
    this.objectManagersMap.set(target, placemark)
  }

  private onObjectEvent(event: ymaps.Event, objectManager: ymaps.ObjectManager, color: string): void {
    const objectId = event?.get('objectId');

    if (event?.get('type') === 'mouseenter') {
      // The setObjectOptions method allows you to set object options "on the fly".
      objectManager.objects.setObjectOptions(objectId, {
        iconColor: '#EC4E6E',
      });
    } else {
      objectManager.objects.setObjectOptions(objectId, {
        iconColor: color,
      });
    }
  }

  onMouseHover({target} : YaReadyEvent<ymaps.ObjectManager>): void {
    target.clusters.options.set('clusterIconColor', '#EC4E6E')
  }

  onMouseLeave({target} : YaReadyEvent<ymaps.ObjectManager>, collection: FeatureCollection): void {
    target.clusters.options.set('clusterIconColor', collection.color)
  }

  public onSizeChange(event: YaEvent<ymaps.Map>) {
    const currentZoom: number = event.target.getZoom()
    if (currentZoom != this.previousZoom) {
      this.onMapZoomChanged(currentZoom)
    }
  }

  private onMapZoomChanged(currentZoom: number): void {
    console.log('MapZoomChanged')
    this.previousZoom = currentZoom

    this.setClustersHint(this.mapClusterer?.getClusters())

    if (currentZoom >= 9 && this.mapZoomOut) {
      this.changeMapPlacemarksToZoomInState()

    } else if (currentZoom < 9 && !this.mapZoomOut) {
      this.changeMapPlacemarksToZoomOutState()
    }
  }

  private setClustersHint(clusters?: IGeoObject[]): void {
    clusters?.forEach(cluster => {
      const clusterObjects = this.sortGeoObjectsByCluster(cluster)
      const clusterHint: string = this.createClusterHint(clusterObjects)
      cluster.properties.set('hintContent', clusterHint)
    })
  }

  private sortGeoObjectsByCluster(cluster: IGeoObject<ymaps.IGeometry>): ymaps.IGeoObject<ymaps.IGeometry>[] {
    const clusterObjects: ymaps.IGeoObject<ymaps.IGeometry>[] = []
    this.mapClusterer?.getGeoObjects().forEach(value => {
      const objectState = this.mapClusterer?.getObjectState(value)
      if (objectState?.cluster === cluster) clusterObjects.push(value)
    })
    return clusterObjects
  }

  private createClusterHint(clusterObjects: ymaps.IGeoObject<ymaps.IGeometry>[]): string {
    return 'Contains:<br>' + clusterObjects.map(object => object.properties.get('iconCaption')).join('<br>')
  }

  private changeMapPlacemarksToZoomInState(): void {
    console.log('MapChangedToZoomInState')
    this.mapZoomOut = false
    this.dayPlacemarksMap.forEach((value, key) => {
      key.options.set('visible', false)
      this.objectManagersMap.forEach((mark, manager) =>
        manager.add(mark.timePlacemarks))
    })
  }

  private changeMapPlacemarksToZoomOutState(): void {
    console.log('MapChangedToZoomOutState')
    this.mapZoomOut = true
    this.dayPlacemarksMap.forEach((value, key) => key.options.set('visible', true))
    this.objectManagersMap.forEach((mark, manager) => manager.removeAll())
  }

  onPlacemarkReady(event: YaReadyEvent<ymaps.Placemark>, placemark: DayPlacemark) {
    let picked: number = 0
    const content = (picked: number): string => {
      const properties = placemark.timePlacemarks[picked].properties
      return `<h2>${properties.balloonContentHeader ?? ''}</h2> <span>${properties.balloonContent ?? ''}</span>`
    }
    const pick = (value: Feature, picked: number): string => {
      const index: number = placemark.timePlacemarks.indexOf(value)
      if (index != picked) {
        return `<li class="menu-item" id="${index}" style="cursor: pointer;">
                  ${value.properties.balloonContentHeader}
                </li>`
      } else {
        return `<li class="menu-item menu-item__active" id="${index}" style="cursor: pointer;">
                  ${value.properties.balloonContentHeader}
                </li>`
      }
    }
    const formList = (picked: number): string => placemark.timePlacemarks.map(value => pick(value, picked)).join('')

    const balloonHtmlTemplate =
      '<div class="balloon-content-container" style="\n' +
      '            display: flex;\n' +
      '            width: 400px;\n' +
      '            height: 200px;\n' +
      '            overflow: hidden;\n' +
      '            "\n' +
      '>\n' +
      '  <a class="close" href="#">&times;</a>' +
      '  <div class="menu-container" style="\n' +
      '              width: max-content;' +
      '              height: 100%;' +
      '              overflow: auto; ' +
      '              text-align: left;\n' +
      // '              border: 1px solid #000;\n' +
      '              "\n' +
      '  >\n' +
      '    <ul id="list" style="\n' +
      '                list-style-type: none;\n' +
      // '                margin-left: 10px;\n' +
      '                padding: 0;\n' +
      '              "\n' +
      '    >\n'
      +
        formList(picked)
      +
      '    </ul>\n' +
      '  </div>\n' +
      '  <div id="content" style="\n' +
      '              padding: 0 10px 10px 10px;\n' +
      '              width: 60%;\n' +
      '              flex-grow: 1;\n' +
      '             "\n' +
      '  >\n' +
      // content
      // +
      '  </div>\n' +
      '</div>'

    const balloonContentLayout = event.ymaps.templateLayoutFactory.createClass(
      balloonHtmlTemplate, {
        build: function () {
          balloonContentLayout.superclass.build.call(this);
          $('.balloon-content-container').find('.close')
            .on('click', this.onCloseClick.bind(this));
          $('.menu-item').on('click', this.onMenuItemClick)
          $('#content').html(content(picked));
        },

        clear: function () {
          $('#counter-button').off('click', this.onMenuItemClick);
          balloonContentLayout.superclass.clear.call(this);
        },

        onCloseClick(e: Event) {
          e.preventDefault();
          event.target.balloon.close()
        },

        onMenuItemClick: function () {
          $('.menu-item').removeClass('menu-item__active')
          $(this).addClass('menu-item__active')
          picked = Number($(this).attr('id'))
          $('#content').html(content(picked));
        }
      });

    event.target.options.set('balloonContentLayout', balloonContentLayout)
    this.dayPlacemarksMap.set(event.target, placemark)
  }
}


