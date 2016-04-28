/* eslint-env mocha */
var signal = require('./')
var expect = require('expect.js')

describe('smoke signal', function () {
  it('should allow to listen to events', function (done) {
    var onTrigger = signal()
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should be called with arguments', function (done) {
    var onTrigger = signal()
    onTrigger.push(function (arg1, arg2) {
      expect(arg1).to.be(1)
      expect(arg2).to.be(2)
      done()
    })
    onTrigger.trigger(1, 2)
  })

  it('should be able to unlisten', function (done) {
    var onTrigger = signal()
    function unlistend () {
      done('should not be called')
    }
    onTrigger.push(unlistend)
    onTrigger.pull(unlistend)
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should be able to pause by reference', function (done) {
    var onTrigger = signal()
    function paused () {
      done('should not be called')
    }
    var listener = onTrigger.push(paused)
    listener.pause()
    onTrigger.push(done)
    onTrigger.trigger()
  })

  it('should be able to resume by reference', function (done) {
    var onTrigger = signal()
    var listener = onTrigger.push(done)
    listener.pause()
    listener.resume()
    onTrigger.trigger()
  })

  it('should be able to resume by reference', function () {
    var collect = '--'
    var onTrigger = signal()
    onTrigger.once(function (str) {
      collect += str
    })
    onTrigger.trigger('++')
    onTrigger.trigger('||')
    onTrigger.trigger('==')
    expect(collect).to.be('--++')
  })

  it('should be able to unlisten all', function (done) {
    var onTrigger = signal()
    function unlistend () {
      done('should not be called')
    }
    onTrigger.push(unlistend)
    onTrigger.clear()
    onTrigger.trigger()
    done()
  })

  it('should handle exceptions', function (done) {
    var onTrigger = signal()
    onTrigger.push(function () {
      throw new Error('should not bubble up')
    })
    onTrigger.push(done)
    onTrigger.trigger()
  })
})
