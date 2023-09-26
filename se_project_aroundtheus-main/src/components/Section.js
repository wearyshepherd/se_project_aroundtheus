export default class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
        this._section = document.querySelector(this._selector)
    };
    
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    };

    addItem(item) {
        this._section.prepend(item);
    };
};
