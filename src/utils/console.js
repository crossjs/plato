export function log () {
  __DEV__ && console.log.apply(console, arguments)
}

export function warn () {
  __DEV__ && console.warn.apply(console, arguments)
}

export function error () {
  __DEV__ && console.error.apply(console, arguments)
}

export function group () {
  __DEV__ && console.group.apply(console, arguments)
}

export function groupEnd () {
  __DEV__ && console.groupEnd.apply(console, arguments)
}
