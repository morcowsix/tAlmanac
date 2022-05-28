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
  private placemark: DayPlacemark

  constructor() {}

  public create(event: YaReadyEvent<ymaps.Placemark>, placemark: DayPlacemark): ymaps.IClassConstructor<any> {
    this.placemark = placemark
    this.balloonContentLayout = event.ymaps.templateLayoutFactory.createClass(
      balloonHtmlTemplate, this.getOverridesFunctions()
    )
    return this.balloonContentLayout
  }

  private getContent(): string {
    const properties: ymaps.IPlacemarkProperties = this.placemark.timePlacemarks[this.pickedMenuItem].properties
    return this.getContentContainerHtmlTemplate(properties);
  }

  private getMenuItemList(): string {
    return this.placemark.timePlacemarks.map(timePlacemark => this.getMenuItem(timePlacemark)).join('')
  }

  private getMenuItem(timePlacemark: Feature): string {
    const timePlacemarkIndex: number = this.placemark.timePlacemarks.indexOf(timePlacemark)
    const balloonContentHeader: string = timePlacemark.properties.balloonContentHeader ?? ''
    return this.getMenuItemHtmlTemplate(timePlacemarkIndex, balloonContentHeader);
  }

  private getMenuItemHtmlTemplate (timePlacemarkIndex: number, balloonContentHeader: string): string {
    return `<li class="menu-item" id="${timePlacemarkIndex}" style="cursor: pointer;">
                ${balloonContentHeader}
              </li>`
  }

  private getContentContainerHtmlTemplate(properties: ymaps.IPlacemarkProperties): string {
    return `<h2>${properties.balloonContentHeader ?? ''}</h2> <span>${properties.balloonContent ?? ''}</span>`
  }

  private getOverridesFunctions(): OverridesFunctions {
    const context = this

    return {
      build: function () {
        context.balloonContentLayout.superclass.build.call(this);
        context.setMenuItemsListContent()
        context.setContentContainerContent()
        context.addClickEventListenerToMenuItem(this.onMenuItemClick)
        context.activateFirstItem()
      },

      clear: function () {
        context.removeClickEventListenerFromMenuItem(this.onMenuItemClick)
        context.balloonContentLayout.superclass.clear.call(this);
      },

      onMenuItemClick: function (e: JQuery.TriggeredEvent) {
        const clickedElement: JQuery<HTMLElement> = $(e.target)
        context.setPickedMenuItemByClickedElementId(clickedElement)
        context.activatePickedItem(clickedElement)
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

}
