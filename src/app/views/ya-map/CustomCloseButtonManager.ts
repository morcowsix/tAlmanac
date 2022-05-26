export class CustomCloseButtonManager {

  private static readonly BUTTON_HTML_CLASS: string = 'close-button'
  private static readonly BUTTON_HTML_TEMPLATE: string = `<a class="${this.BUTTON_HTML_CLASS}" href="#">&times;</a>`

  public static balloonCloseElementIsExist(): boolean {
    return $(".ymaps-2-1-79-balloon__close").length > 0
  }

  public static changeDefaultCloseButton() {
    $(".ymaps-2-1-79-balloon__close-button").remove()
    $('.ymaps-2-1-79-balloon__close').append(this.BUTTON_HTML_TEMPLATE)
  }

  public static attachCloseButtonEvent(balloon: ymaps.map.Balloon) {
    $(`.${this.BUTTON_HTML_CLASS}`).on('click', (e: Event) => {
      e.preventDefault();
      balloon.close()
    })
  }

  public static detachCloseButtonEvent() {
    $(`.${this.BUTTON_HTML_CLASS}`).off('click')
  }

}
