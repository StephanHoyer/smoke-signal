[![Build Status](https://travis-ci.org/StephanHoyer/smoke-signal.svg)](https://travis-ci.org/StephanHoyer/smoke-signal) [![rethink.js](https://img.shields.io/badge/rethink-js-yellow.svg)](https://github.com/rethinkjs/manifest)

# smoke-signal

Simple small functional event observer for the browser and node

## Installation

```
npm install smoke-signal
```

## Usage

```javascript
var signal = require('smoke-signal')

var onMySignal = signal()

// attach listenerFn to event
var listener = onMySignal.push(listenerFn)

// allow to listen only once
var listener = onMySignal.once(listenerFn)

// trigger event
onMySignal.trigger()

// unlisten to event
onMySignal.pull(listenerFn)

// pause listening (pretty much the same as `onMySignal.pull(listenerFn)`)
listener.pause()

// resume listening (pretty much the same as `onMySignal.push(listenerFn)`)
listener.resume()

// remove all listeners
onMySignal.clear()
```

It's also possible to listen and trigger with args

```javascript
var signal = require('smoke-signal')

var onMySignal = signal()

// attach listenerFn to event
onMySignal.push(function(arg) {
  // arg === 'foo'
})

// trigger event
onMySignal.trigger('foo')
```
