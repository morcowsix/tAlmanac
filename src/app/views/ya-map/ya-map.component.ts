import {Component, OnInit} from '@angular/core';
import {YaEvent, YaReadyEvent} from "angular8-yandex-maps";
import {AnimationOptions} from "ngx-lottie";
import {YaMapService} from "./ya-map.service";
import {Date, DayDataset, DayPlacemark, Feature, FeatureCollection, MapDataset} from "./ya-map.model";
import {RussianMonthsDeclensionPipe} from "../../pipes/russian-months-declension.pipe";
import {DecimalPipe} from "@angular/common";
import Clusterer = ymaps.Clusterer;

@Component({
  selector: 'app-ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss'],

})
export class YaMapComponent implements OnInit {
  map?: ymaps.Map
  objectManagersMap: Map<ymaps.ObjectManager, FeatureCollection> = new Map<ymaps.ObjectManager, FeatureCollection>()
  objManager: ymaps.ObjectManager
  options: AnimationOptions = {
    path: '/assets/lottie/map_loading_animation.json',
  };

  constructor(
    private yaMapService: YaMapService,
    private decimalPipe: DecimalPipe,
    private monthDeclensionPipe: RussianMonthsDeclensionPipe
    ) {}

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
    gridSize: 5024,
    maxZoom: 8,
    clusterDisableClickZoom: true,
    // clusterIconLayout: 'default#pieChart',
    showInAlphabeticalOrder: true,
    clusterHideIconOnBalloonOpen: true
  }

  dayPlacemarks: DayPlacemark[] = []
  featureCollections: FeatureCollection[] = []

  //TODO move to special service working with date and separate on methods
  declensionDate = (date: Date): string => {
    return `${this.decimalPipe.transform(date.number, '2.0-0')}
              ${this.monthDeclensionPipe.transform(date.month)}
              ${date.year}`
  }

  ngOnInit(): void {
    // const datasets: MapDataset[][] = this.yaMapService.getCoordinatesForEveryMeasurement()
    // this.featureCollections.concat(this.createGeoObjectCollections(datasets))

    const dataset: DayDataset[] = this.yaMapService.separateCoordinatesByDay()
    this.dayPlacemarks = this.dayPlacemarks.concat(this.createPlacemarks(dataset))
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
        date = dataset.date.month
        color = dataset.color
      })

      this.featureCollections.push({type: "FeatureCollection", features: features, date: date, color: color})
    });
    return featureCollections
  }

  private createPlacemarks(dayDatasets: DayDataset[]): DayPlacemark[] {
    const dayPlacemarks: DayPlacemark[] = []
    dayDatasets.forEach(dayDataset => {
      dayPlacemarks.push(this.createDayPlacemark(dayDataset))
    })
    return dayPlacemarks
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
        balloonContentHeader: this.declensionDate(dayDataset.date),
        balloonContent: `
                        Coordinates:
                        <br>
                        ${dayDataset.coordinates[0].toFixed(5)},
                        ${dayDataset.coordinates[1].toFixed(5)}
                        <br>
                        <br>
                        ${dayDataset.balloonContent}
                        `,
        iconCaption: this.declensionDate(dayDataset.date)
      },
      options: {
        preset: 'islands#circleDotIcon',
        iconColor: dayDataset.color,
        hasBalloon: true,
        balloonPanelMaxMapArea: 0,
        balloonCloseButton: false
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
        balloonContentHeader: `${dataset.time} ${this.declensionDate(dataset.date)}`,
        balloonContent: `
                        Coordinates:
                        <br>
                        ${dataset.coordinates[0].toFixed(5)},
                        ${dataset.coordinates[1].toFixed(5)}
                        <br>
                        <br>
                        ${dataset.balloonContent}
                        `,
        hintContent: `${dataset.time} ${dataset.date}`,
      },
      options: {
        preset: 'islands#icon',
        // preset: 'islands#dotIcon',
        iconColor: dataset.color,
      }
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>) {
    this.map = event.target
  }

  onPlacemarkClick({target}: YaEvent<ymaps.Placemark>, placemark: DayPlacemark) {
    this.objManager.removeAll()
    this.objManager.add(placemark.timePlacemarks)

    const clusters: Clusterer[] = this.objManager.clusters.getAll().map(object => object as Clusterer)
    const firstCluster: Clusterer | undefined = clusters.shift()
    clusters.forEach(cluster => {
      firstCluster?.add(cluster.getGeoObjects())
      cluster.removeAll()
    })

    const objectState = this.objManager.getObjectState(1);

    if (objectState.isClustered) {
      // Making sure that the specified object has been "selected" in the balloon.
      this.objManager.clusters.state.set('activeObject', this.objManager.objects.getById(1));

      /**
       * All the generated clusters have unique identifiers.
       * This identifier must be passed to the balloon manager to specify
       * which cluster to show the balloon on.
       */

      this.objManager.clusters.balloon.open((objectState.cluster as Record<string, any>)['id'])
    } else {
      this.objManager.objects.balloon.open(1);
    }

  }

  onObjectManagerReadyTest({target}: YaReadyEvent<ymaps.ObjectManager>) {
    this.objManager = target
  }

  onObjectManagerReady(target: YaReadyEvent<ymaps.ObjectManager>, collection: FeatureCollection): void {
    const objectManager = target.target
    // target.objects.options.set('preset', 'islands#dotIcon');
    objectManager.clusters.options.set('clusterIconColor', collection?.color)
    objectManager.clusters.options.set('hasHint', true)

    objectManager.objects.events.add(['mouseenter', 'mouseleave'],
        event => this.onObjectEvent(event, objectManager, collection.color ?? '#000'))

    objectManager.add(collection ?? [])

    this.changeClusterHint(collection, objectManager.clusters)

    // this.setHoverColorListener(objectManager.events)

    this.objectManagersMap.set(objectManager, collection)
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

  onSizeChange(event: YaEvent<ymaps.Map>) {
    // this.objectManagersMap.forEach((collection, objectManager) => {
    //   this.changeClusterHint(collection, objectManager.clusters)
    // })
    console.log(`zoom: `, event.target.getZoom())
  }

  private changeClusterHint(collection: FeatureCollection, clusters: ymaps.objectManager.ClusterCollection) {
    clusters.each(cluster => {
      const assignedCluster = cluster as Feature
      assignedCluster.properties.hintContent = collection?.date
    })
  }

  onClustererReady({target}: YaReadyEvent<ymaps.Clusterer>) {
    target.options.set('preset', 'islands#stretchyIcon');
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
  }
}


