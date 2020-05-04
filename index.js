// requirements
// register event emitter string, function
// trigger events key
// turn events off key

// const ee = new EventEmiter()
// ee.events = 'foo'
// ee.on('hello', () => console.log('world'))
// ee.on('hello', () => console.log('world2'))
// ee.on('hello2', () => console.log('world2'))
// ee.trigger('hello')
// ee.off('hello')

function EventEmitter() {
  // TODO: check for new.target and throw error if not called correctly
  let events = {}
  console.log('init')
  return {
    on: (key, func) => {
      // TODO: check if func is actually function type
      // NOTE: change to array to allow multiple events
      if (!events[key]) events[key] = []
      events[key].push(func)
    },
    show: () => events,
    off: (key) => {
      delete events[key]
    },
    // NOTE: add remove all function
    clearAll: () => (events = {}),
    trigger: (key, ...items) => {
      const arr = events[key]
      arr && arr.forEach((func) => func(...items))
    },
  }
}

// tests
const ee = new EventEmitter()
ee.on('hello', () => console.log('hello1a: world'))
ee.on('hello', () => console.log('hello1b: world'))
ee.on('hello2', (...items) => console.log(`hello2: ${items}`))
ee.trigger('hello')
ee.trigger('hello2')

console.log(ee.show())
ee.off('hello')
ee.off('hello')
console.log(ee.show())
ee.trigger('hello2', 'one', 'two', 'three')

const ee2 = new EventEmitter()
ee2.on('hello', () => console.log('world'))
ee2.on('hello2', (...items) => console.log('ee2', ...items))
ee2.trigger('hello')
ee2.trigger('hello2', 'one', 'two', 'three')
