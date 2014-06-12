/* globals console */
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

window.preRenderSyncPhase = true;
(function(RenderBufferProto) {
  var _generateElement = RenderBufferProto.generateElement;
  var _element = RenderBufferProto.element;

  RenderBufferProto.generateElement = function() {
    var id = this.elementId,
        node = window.preRenderSyncPhase && id && document.getElementById(id);

    if (!node) {
      return _generateElement.call(this);
    }

    this.elementId = null;
    this.classes = null;
    this.elementClasses = null;
    this.elementStyle = null;
    this.elementAttributes = null;
    this.elementProperties = null;
    return node;
  };

  RenderBufferProto.element = function() {
    return window.preRenderSyncPhase ? this._element : _element.call(this);
  };
}(Ember._RenderBuffer.prototype));

var App = Ember.Application.extend({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'appkit');

export default App;
