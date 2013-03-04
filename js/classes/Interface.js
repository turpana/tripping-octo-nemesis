/**
 * @file
 * Interface class
 */
var Interface = function(name, methods) {
  if (arguments.length != 2) {
    throw new Error("Interface constructor called with " + arguments.length 
        + " arguments, but expected exactly 2.");
  }
  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
    if ('string' != typeof methods[i]) {
      throw new Error("Interface constructor expects method names to be "
          + "passed in as strings.");
    }
    this.methods.push(methods[i]);
  }
};
Interface.ensureImplements = function(object) {
  if (arguments.length != 2) {
    throw new Error("Interface constructor called with " + arguments.length 
        + " arguments, but expected exactly 2.");
  }
  for (var i=1, len = arguments.length; i < len; i++) {
    var interface = arguments[i];
    if(interface.constructor !== Interface) {
      throw new Error("Function Interface.ensureImplements expects arguments"
          + " two and above to be instances of Interface.");
    }
    for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
      var method = interface.methods[j];
      if(!object[method] || typeof object[method] !== 'function') {
        throw new Error("Function Interface.ensureImplements: object "
            + "does not implement the " + interface.name
            + " interface. Method " + method + " was not found.");
      }
    }
  }
}
