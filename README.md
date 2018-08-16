# maputnik-push
A mapboxGL plugin that pushes styles to Maputnik

## Why
Styling mapboxGL maps is hard. The GUI Style Editor Maputnik makes it easy, but it likes a hosted style.json.

## How
This plugin adds a button that pulls the style from any mapboxGL and pushes it to the maputnik-push service, which will host it for a short time.
It then opens a new browser tab where Maputnik will load the hosted style.

## How to use

### Add the plugin via yarn or browserify
`yarn add https://github.com/chriswhong/mapboxgl-maputnik-push#v0.0.1`

OR

`npm run build` and then include `dist/mapboxgl-maputnik-push.js` in a script tag in your site.

### 

## Example Map
Run `python -m SimpleHTTPServer 8000` in the root, navigate to `http://localhost:8000/example`.
Click the maputnik button in the bottom-right of the map, and the style will be instantly opened in Maputnik!
