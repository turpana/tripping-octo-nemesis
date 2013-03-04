/**
 * @file
 * Graph class representing an abstract group of nodes and edges
 */
var Graph = (function() {
  // private static
  var label = '';
  var nodes = [];
  var edges = [];
  // constructor
  return function() {
    // public methods
    this.getLabel = function() { return label; }
    this.setLabel = function(newLabel) {
      if ('string' != typeof newLabel) throw new Error('Graph Error: graph label must be a string');
      label = newLabel;
      return true;
    };
    this.addNode = function () { };
    this.removeNode = function () {};
    this.getNodes = function() {};
    this.addVertex = function() {};
    this.removeVertex = function() {};
    this.getVertices = function() {};
    Interface.ensureImplements(this, GraphI);
  }
})();
