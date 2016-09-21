# Essential GeoJSON scripts part CXLVIII

Use this litte script to iterate over the features of a [GeoJSON](http://geojson.org/)
object and do stuff with them. Has a `.forward()` and a `.rewind()` method, just
like the good old [cassette recorder](https://en.wikipedia.org/wiki/Cassette_deck).
Use it with e.g. events to iterate programmatically through the features.

You need to pass a function to retrieve data from the feature:
```
function getData (feature) {
  var data = {},
      cols = [ "title", "desc", "image", "icon", "color", "category",
               "pitch", "bearing", "zoom", "speed", "curve" ];
  data["center"] = feature.geometry.coordinates;

  for (var key in feature.properties) {
    if (cols.indexOf(key) > -1) { data["key"] = feature.properties["key"]; }
  }
  return data
}

scroller = new GeoJsonScroller(myGeoJson, getData);
var data = scroller.forward();
```

You can pass a function in order to sort the features by some criteria. Have a look
at the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for how to write
such a function.
```
// this works for numerical props
function sortById (a, b) {
  return a.properties.id - b.properties.id;
}

function getData (feature) {
  // bla
}

scroller = new GeoJsonScroller(myGeoJson, getData, sortById);
var data = scroller.forward();
```

Have fun!
