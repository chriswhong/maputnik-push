const domCreate = (tagName, className, container) => {
  const el = window.document.createElement(tagName);
  if (className) el.className = className;
  if (container) container.appendChild(el);
  return el;
};

class MaputnikPush {
  constructor() {
    this._container = domCreate('div', 'mapboxgl-ctrl mapboxgl-ctrl-group');
  }

  onAdd(map) {
    this._map = map;
    this._maputnikButton = this._createButton('mapboxgl-ctrl-icon mapboxgl-ctrl-maputnik', 'Push Style to Maputnik', () => this.pushToMaputnik());
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  pushToMaputnik() {
    const map = this._map;
    const style = map.getStyle();
    const zoom = map.getZoom();
    const { lng, lat } = map.getCenter();

    fetch('https://maputnik-push.planninglabs.nyc/style', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(style),
    })
      .then(d => d.json())
      .then((res) => {
        const { styleid } = res;
        window.open(`https://maputnik.github.io/editor/?style=https://maputnik-push.planninglabs.nyc/style/${styleid}#${zoom}/${lat}/${lng}`, '_blank');
      });
  }

  _createButton(className, ariaLabel, fn) {
    const a = domCreate('button', className, this._container);
    a.type = 'button';
    a.setAttribute('aria-label', ariaLabel);
    a.addEventListener('click', fn);
    a.innerHTML = '<img src="//github.com/maputnik/editor/raw/master/src/img/maputnik.png" style="width: 15px;height: 15px;padding-top: 4px;">';
    return a;
  }
}

module.exports = MaputnikPush;
