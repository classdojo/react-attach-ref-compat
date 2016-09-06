/**
 * Extreme hackery going on here.
 * Monkey-patch the way React 0.13 attaches refs to match React 15 behavior, i.e.
 * when the referenced component is a DOM Component, the ref should point to the
 * DOMElement, not the Component.
 */
var ReactCompositeComponent = require("react/lib/ReactCompositeComponent");
var emptyObject = require("react/lib/emptyObject");
ReactCompositeComponent.Mixin.attachRef = function(ref, component) {
  var inst = this.getPublicInstance();
  var refs = inst.refs === emptyObject ? (inst.refs = {}) : inst.refs;
  var element = component.getPublicInstance();
  if (element.tagName) {
    element = element.getDOMNode();

    // consumers might not realize ref is a DOM element and call getDOMNode()
    element.getDOMNode = function() { return element; }
  }

  refs[ref] = element;
};
