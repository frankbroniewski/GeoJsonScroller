/**
 * A Scroller to scroll through the features of a GeoJson object
 * and return the properties of the feature on scroll
 *
 * geojson: the GeoJSON object to scroll through
 *                 should return the result as an object
 * sortfunc: an optional sort function for sorting the features
 */
var GeoJsonScroller = function (geojson, propertiesFunc, sortfunc) {

  this.geojson = geojson;
  this.propertiesFunc = propertiesFunc;
  this.position = 0;
  this.numFeatures = this.geojson.features.length;

  if (sortfunc) { this.geojson.features.sort(sortfunc); }

}


GeoJsonScroller.prototype.getData = function () {
  var feature = this.geojson.features[this.position];
  return this.propertiesFunc(feature);
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
