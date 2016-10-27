export function direction (to, from) {
  return Math.abs(to.pageX - from.pageX) - Math.abs(to.pageY - from.pageY)
}
