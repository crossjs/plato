export default function promisify (val) {
  if (val && val.then && typeof val.then === 'function') {
    return val
  }
  return Promise.resolve(val)
}
