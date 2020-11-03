[![Build Status](https://travis-ci.org/StephanHoyer/smoke-signal.svg)](https://travis-ci.org/StephanHoyer/smoke-signal)
[![rethink.js](https://img.shields.io/badge/rethink-js-yellow.svg)](https://github.com/rethinkjs/manifest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![](https://badgen.net/bundlephobia/minzip/smoke-signal)](https://bundlephobia.com/result?p=index.js)

# smoke-signal

Simple small functional event observer for the browser and node

## Installation

```
npm install smoke-signal
```

## Usage

```javascript
const signal = require('smoke-signal')

const onMySignal = signal()

// attach listenerFn to event
const listenAll = onMySignal.push(listenerFn)

// allow to listen only once
const listenOnce = onMySignal.once(listenerFn)

// trigger event
onMySignal.trigger()

// unlisten to event
onMySignal.pull(listenerFn)

// pause listening (pretty much the same as `onMySignal.pull(listenerFn)`)
listenAll.pause()

// resume listening (pretty much the same as `onMySignal.push(listenerFn)`)
listenAll.resume()

// remove all listeners
onMySignal.clear()
```

It's also possible to listen and trigger with args

```javascript
const signal = require('smoke-signal')

const onMySignal = signal()

// attach listenerFn to event
onMySignal.push(function (arg) {
  // arg === 'foo'
})

// trigger event
onMySignal.trigger('foo')
```

### Async trigger

It's also possible to have async handlers and wait for all handlers to settle.

```javascript
const signal = require('smoke-signal')

const onMySignal = signal()

// attach async listenerFn to event
onMySignal.push(async function (arg) {
  // do async stuff
})

// trigger event and wait for all handlers to finish
// this resolves when all promises are settled, think `Promise.all`, no matter what outcome
await onMySignal.triggerAsync('foo')
```

Error handling is the same as in synchronous version.

### Error handling

There are three ways of handling errors in listener, ignore (default), log, handle

To log the errors initialize with option `logExceptions`.

```javascript
const signal = require('smoke-signal')

const onMySignal = signal({
  logExceptions: true,
})

// attach listenerFn to event
onMySignal.push(function () {
  throw new Error('BOOM!')
})

// trigger event
onMySignal.trigger()
// logs error to std.error
```

To handle errors initialize with option `onError`

```javascript
const signal = require('smoke-signal')

const onMySignal = signal({
  onError: function (err) {
    // do something about the error here
  },
})

// attach listenerFn to event
onMySignal.push(function () {
  throw new Error('BOOM!')
})

// trigger event
onMySignal.trigger()
```
