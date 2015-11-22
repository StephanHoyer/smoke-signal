'use strict'

function signal() {
  var listeners = []
  var api = {
    push: function(listener) {
      listeners.push(listener)
      return api
    },
    pull: function(listener) {
      var index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1)
      }
      return api
    },
    trigger: function() {
      var args = arguments
      listeners.map(function(listener) {
        listener.apply(null, args)
      })
      return api
    },
    clear: function() {
      listeners = []
    }
  }
  return api
}

module.exports = signal
