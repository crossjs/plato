const middlewares = []

export function use (fn) {
  middlewares.push(fn)
}

export function run (...args) {
  let i = 0
  let cb

  if (args.length && typeof args[args.length - 1] === 'function') {
    cb = args.pop()
  }

  (function next (...args) {
    const fn = middlewares[i++]

    if (fn) {
      fn.apply(null, args.concat(next))
    } else if (cb) {
      cb.apply(null, args)
    }
  })(...args)
}
