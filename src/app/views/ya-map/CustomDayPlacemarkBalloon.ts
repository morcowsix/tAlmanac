import {DayPlacemark, Feature} from "./ya-map.model";
import balloonHtmlTemplate from "./balloon-templete.html";
import {YaReadyEvent} from "angular8-yandex-maps";

interface OverridesFunctions {
  build(): void
  clear(): void
  onMenuItemClick(event?: JQuery.TriggeredEvent): void
}

export class CustomDayPlacemarkBalloon {

  private pickedMenuItem: number = 0
  private balloonContentLayout: ymaps.IClassConstructor<any>

  constructor(private event: YaReadyEvent<ymaps.Placemark>, private placemark: DayPlacemark) {}

  public create(): ymaps.IClassConstructor<any> {
    this.balloonContentLayout = this.event.ymaps.templateLayoutFactory.createClass(
      balloonHtmlTemplate, this.getOverridesFunctions()
    )
    return this.balloonContentLayout
  }

  private getContent(): string {
    const properties: ymaps.IPlacemarkProperties = this.placemark.timePlacemarks[this.pickedMenuItem].properties
    return this.getContentContainerHtmlTemplate(properties);
  }

  private getMenuItem(timePlacemark: Feature): string {
    const timePlacemarkIndex: number = this.placemark.timePlacemarks.indexOf(timePlacemark)
    const balloonContentHeader: string = timePlacemark.properties.balloonContentHeader ?? ''
    return this.getMenuItemHtmlTemplate(timePlacemarkIndex, this.pickedMenuItem, balloonContentHeader);
  }

  private getMenuItemList(): string {
    return this.placemark.timePlacemarks.map(timePlacemark => this.getMenuItem(timePlacemark)).join('')
  }

  private getOverridesFunctions(): OverridesFunctions {
    const self = this

    return {
      build: function () {
        self.balloonContentLayout.superclass.build.call(this);
        self.setMenuItemsListContent()
        self.setContentContainerContent()
        self.addClickEventListenerToMenuItem(this.onMenuItemClick)
        self.activateFirstItem()
      },

      clear: function () {
        self.removeClickEventListenerFromMenuItem(this.onMenuItemClick)
        self.balloonContentLayout.superclass.clear.call(this);
      },

      onMenuItemClick: function (e: JQuery.TriggeredEvent) {
        const clickedElement: JQuery<HTMLElement> = $(e.target)
        self.setPickedMenuItemByClickedElementId(clickedElement)
        self.activatePickedItem(clickedElement)
      }
    }
  }

  private setMenuItemsListContent() {
    $('#menu-items-list').html(this.getMenuItemList())
  }

  private setContentContainerContent() {
    $('#content-container').html(this.getContent());
  }

  private addClickEventListenerToMenuItem(callback: (event: JQuery.TriggeredEvent) => void) {
    $('.menu-item').on('click', event => callback(event))
  }

  private removeClickEventListenerFromMenuItem(callback: (event: JQuery.TriggeredEvent) => void) {
    $('.menu-item').off('click', event => callback(event))
  }

  private setPickedMenuItemByClickedElementId(clickedElement: JQuery<HTMLElement>): void {
    this.pickedMenuItem = Number(clickedElement.attr('id'))
  }

  private activateFirstItem(): void {
    const menuItemElement: JQuery<HTMLElement> = $('.menu-item')
    menuItemElement.removeClass('menu-item__active')
    menuItemElement.first().addClass('menu-item__active')
    this.setContentContainerContent()
  }

  private activatePickedItem(clickedElement: JQuery<HTMLElement>): void {
    $('.menu-item').removeClass('menu-item__active')
    clickedElement.addClass('menu-item__active')
    this.setContentContainerContent()
  }

  //TODO move selection logic to jquery methods
  private getMenuItemHtmlTemplate (timePlacemarkIndex: number, pickedMenuItem: number, balloonContentHeader: string): string {
    if (timePlacemarkIndex != pickedMenuItem) {
      return `<li class="menu-item" id="${timePlacemarkIndex}" style="cursor: pointer;">
                  ${balloonContentHeader}
                </li>`
    } else {
      return `<li class="menu-item menu-item__active" id="${timePlacemarkIndex}" style="cursor: pointer;">
                  ${balloonContentHeader}
                </li>`
    }
  }

  private getContentContainerHtmlTemplate(properties: ymaps.IPlacemarkProperties): string {
    return `<h2>${properties.balloonContentHeader ?? ''}</h2> <span>${properties.balloonContent ?? ''}</span>`
  }

}
