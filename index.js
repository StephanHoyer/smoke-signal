'use strict'

function signal (options) {
  var listeners = []
  var api = {
    push: function (listener) {
      if (listeners.indexOf(listener) < 0) {
        listeners.push(listener)
      }
      return {
        pause: function () {
          api.pull(listener)
        },
        resume: function () {
          api.push(listener)
        }
      }
    },
    pull: function (listener) {
      var index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
      return api
    },
    trigger: function () {
      var args = arguments;
      [].concat(listeners).map(function (listener) {
        try {
          listener.apply(null, args)
        } catch (e) {
          if (options && options.logExceptions) {
            console.error(e)
          }
        }
      })
      return api
    },
    clear: function () {
      listeners = []
    }
  }
  return api
}

module.exports = signal
