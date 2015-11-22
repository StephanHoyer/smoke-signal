# smoke-signal

Simple small functional event observer for the browser and node

## Installation

```
npm install smoke-signal
```

## Usage

```javascript
var signal = require('smoke-signal')

var mySignal = signal()

// attach listenerFn to event
mySignal.push(listenerFn)

// trigger event
mySignal.trigger()

// unlisten to event
mySignal.pull(listenerFn)

// remove all listeners
mySignal.clear()
```

It's also possible to listen and trigger with args

```javascript
var signal = require('smoke-signal')

var mySignal = signal()

// attach listenerFn to event
mySignal.push(function(arg) {
  // arg === 'foo'
})

// trigger event
mySignal.trigger('foo')
```
