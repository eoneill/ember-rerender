/* globals console */
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

import EditTodoView from 'appkit/views/edit_todo';

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

(function() {
  var o_defineProperty = Ember.platform.defineProperty;
  var uuid = 0;
  var GUID_KEY = Ember.GUID_KEY;
  var GUID_DESC = {
    writable:    false,
    configurable: false,
    enumerable:  false,
    value: null
  };

  // this is a custom guid for views...
  // @see Ember.guidFor
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
      this.elementId = this.elementId || guidForView(this);
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
