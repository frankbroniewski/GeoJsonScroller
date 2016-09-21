/**
 * A Scroller to scroll through the features of a GeoJson object
 * and return the properties of the feature on scroll
 *
 * geojson: the geosjon object to scroll through
 * properties: which properties to return
 * coordinates: 'yes' or 'no', return the coordinates of the feature with the properties
 * sortfunc: an optional sort function for sorting the features
 */
var GeoJsonScroller = function (geojson, properties, coordinates, sortfunc) {

  this.geojson = geojson;
  this.properties = properties;
  this.coordinates = coordinates;
  this.position = 0;
  this.numFeatures = this.geojson.features.length;

  if (sortfunc) { this.geojson.features.sort(sortfunc); }

}


GeoJsonScroller.prototype.getData = function () {
  var feature = this.geojson.features[this.position],
      data = {};

  if (this.coordinates == "yes") {
    data["center"] = feature.geometry.coordinates;
  }

  for (var key in feature.properties) {
    if (this.properties.indexOf(key) > -1) {
      data[key] = properties[key];
    }
  }

  return data;
};


GeoJsonScroller.prototype.forward = function () {
  var index = this.position + 1;
  if (index > this.numFeatures) { index = index - this.numFeatures; }
  this.position = index;
  return this.getData();
}


GeoJsonScroller.prototype.rewind = function () {
  var index = this.position - 1;
  if (index < 0) { index = index + this.numFeatures; }
  this.position = index;
  return this.getData();
}
