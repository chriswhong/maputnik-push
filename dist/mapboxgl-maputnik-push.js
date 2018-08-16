(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MaputnikPush = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
domCreate = function (tagName, className, container) {
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
    };

    onRemove(map) {
     this._container.parentNode.removeChild(this._container);
     this._map = undefined;
    };

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

},{}]},{},[1])(1)
});
