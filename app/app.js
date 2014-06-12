/* globals console */
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

import EditTodoView from 'appkit/views/edit_todo';

// MAGIC
(function(RenderBufferProto) {
  var _generateElement = RenderBufferProto.generateElement;
  var _element = RenderBufferProto.element;

  // this modifies the normal generateElement to allow it to find an existing node of given viewId in the DOM
  RenderBufferProto.generateElement = function() {
    var id = this.elementId,
        node = window.preRenderSyncPhase && id && document.getElementById(id);

    // if the node doesn't exist in the DOM...
    if (!node) {
      // business as usual
      return _generateElement.call(this);
    }

    // remove all the things
    this.elementId = null;
    this.classes = null;
    this.elementClasses = null;
    this.elementStyle = null;
    this.elementAttributes = null;
    this.elementProperties = null;

    return node;
  };

  // this probably isn't necessary, but it avoids an extra DOM interaction
  RenderBufferProto.element = function() {
    // we're going to assume that if we're in preRenderSyncPhase, that we don't need to update the DOM yet, so just return the known element
    return (window.preRenderSyncPhase && this._element) || _element.call(this);
  };
}(Ember._RenderBuffer.prototype));

(function() {
  // this is mostly copied from Ember.guidFor
  var o_defineProperty = Ember.platform.defineProperty;
  var uuid = 0;
  var GUID_KEY = Ember.GUID_KEY;
  var GUID_DESC = {
    writable:    false,
    configurable: false,
    enumerable:  false,
    value: null
  };

  // for views, we want a more unique ID
  // there's some inconsistency otherwise that I think is a result of using things like Ember Inspector (which seems to shift the global uuid counter)
  function guidForView(obj) {
    var ret = 'emberv' + (uuid++);

    if (obj[GUID_KEY] === null) {
      obj[GUID_KEY] = ret;
    } else {
      GUID_DESC.value = ret;
      o_defineProperty(obj, GUID_KEY, GUID_DESC);
    }
    return ret;
  }

  Ember.View.reopen({
    init: function () {
      // get a uuid for the view...
      this.elementId = this.elementId || guidForView(this);
      // and business as usual
      this._super();
    }
  });
}());

var App = Ember.Application.extend({
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'appkit');

export default App;
