export default map => Array.isArray(map)
  ? map.map(key => ({ key, val: key }))
  : Object.keys(map).map(key => ({ key, val: map[key] }))
