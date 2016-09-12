[![Build Status](https://travis-ci.org/StephanHoyer/smoke-signal.svg)](https://travis-ci.org/StephanHoyer/smoke-signal)
[![rethink.js](https://img.shields.io/badge/rethink-js-yellow.svg)](https://github.com/rethinkjs/manifest)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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

### Error handling

There are three ways of handling errors in listener, ignore (default), log, handle

To log the errors initialize with option `logExceptions`.

```javascript
var signal = require('smoke-signal')

var onMySignal = signal({
  logExceptions: true
})

// attach listenerFn to event
onMySignal.push(function() {
  throw new Error('BOOM!')
})

// trigger event
onMySignal.trigger()
// logs error to std.error
```

To handle errors initialize with option `onError`

```javascript
var signal = require('smoke-signal')

var onMySignal = signal({
  onError: function(err) {
    // do something about the error here
  }
})

// attach listenerFn to event
onMySignal.push(function() {
  throw new Error('BOOM!')
})

// trigger event
onMySignal.trigger()
```
