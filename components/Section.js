export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.reverse().forEach((item) => this.addItem(this._renderer(item)));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

//