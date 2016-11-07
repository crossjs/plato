export function isHorizontal (to, from) {
  return Math.abs(to.pageX - from.pageX) > Math.abs(to.pageY - from.pageY)
}

export function isVertical (to, from) {
  return Math.abs(to.pageX - from.pageX) < Math.abs(to.pageY - from.pageY)
}
