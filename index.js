'use strict'

function signal({ onError, logExceptions } = {}) {
  const handleError = onError || (logExceptions ? console.error : () => {})
  let listeners = []
  const api = {
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
        },
      }
    },
    pull: function (listener) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
      return api
    },
    once: function (listener) {
      const handler = api.push(function (...args) {
        listener(...args)
        handler.pause()
      })
      return handler
    },
    trigger: function (...args) {
      [...listeners].map(function (listener) {
        try {
          listener(...args)
        } catch (e) {
          handleError(e)
        }
      })
      return api
    },
    triggerAsync: async function (...args) {
      await Promise.all(
        listeners.map(listener =>
          listener(...args).catch(handleError)
        )
      )
      return api
    },
    clear: function () {
      listeners = []
    },
  }
  return api
}

module.exports = signal
