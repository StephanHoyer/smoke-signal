/* eslint-env mocha */
const signal = require('./')
const expect = require('expect.js')

describe('smoke signal', function () {
  it('should allow to listen to events', function (done) {
    const onTrigger = signal()
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should be called with arguments', function (done) {
    const onTrigger = signal()
    onTrigger.push(function (arg1, arg2) {
      expect(arg1).to.be(1)
      expect(arg2).to.be(2)
      done()
    })
    onTrigger.trigger(1, 2)
  })

  it('should be able to unlisten', function (done) {
    const onTrigger = signal()
    function unheard() {
      done('should not be called')
    }
    onTrigger.push(unheard)
    onTrigger.pull(unheard)
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should be able to pause by reference', function (done) {
    const onTrigger = signal()
    function paused() {
      done('should not be called')
    }
    const listener = onTrigger.push(paused)
    listener.pause()
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should be able to resume by reference', function (done) {
    const onTrigger = signal()
    const listener = onTrigger.push(done)
    listener.pause()
    listener.resume()
    onTrigger.trigger()
  })

  it('should be able to listen only once', function () {
    let collect = '--'
    const onTrigger = signal()
    onTrigger.once(function (str) {
      collect += str
    })
    onTrigger.trigger('++')
    onTrigger.trigger('||')
    onTrigger.trigger('==')
    expect(collect).to.be('--++')
  })

  it('should be able to unlisten all', function (done) {
    const onTrigger = signal()
    function unheard() {
      done('should not be called')
    }
    onTrigger.push(unheard)
    onTrigger.clear()
    onTrigger.trigger()
    done()
  })

  it('should handle exceptions', function (done) {
    const onTrigger = signal()
    onTrigger.push(function () {
      throw new Error('should not bubble up')
    })
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should allow to add custom exception handler', function (done) {
    const error = new Error('should land in error handler')
    const onTrigger = signal({
      onError: function (err) {
        expect(error).to.eql(err)
        done()
      },
    })
    onTrigger.push(function () {
      throw error
    })
    onTrigger.trigger()
  })
})

describe('async smoke-signal', function () {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('should run wait for all async listeners to settle', async function () {
    let triggered = false
    const onTrigger = signal.async({ logExceptions: true })
    onTrigger.push(async function () {
      await sleep(1)
      triggered = true
    })
    expect(triggered).to.be(false)
    await onTrigger.trigger()
    expect(triggered).to.be(true)
  })

  it('should handle exceptions', async function () {
    const onTrigger = signal.async()
    onTrigger.push(async function () {
      await sleep(1)
      throw new Error('should not bubble up')
    })
    await onTrigger.trigger()
  })

  it('should allow to add custom exception handler', async function () {
    let catchedError
    const error = new Error('should land in error handler')
    const onTrigger = signal.async({
      onError: function (err) {
        catchedError = err
      },
    })
    onTrigger.push(async function () {
      await sleep(1)
      throw error
    })
    await onTrigger.trigger()
    expect(catchedError).to.be(error)
  })
})
