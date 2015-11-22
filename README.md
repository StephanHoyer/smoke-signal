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
onMySignal.push(listenerFn)

// trigger event
onMySignal.trigger()

// unlisten to event
onMySignal.pull(listenerFn)

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
