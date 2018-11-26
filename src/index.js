// @flow

import { cloneDeep, get, set } from 'lodash'

const mapper = (from: Object, to: Object, mapProfile: Object): Object => {
  // Create copy
  const z = cloneDeep(to || {})
  // Test for profile
  if (!mapProfile || Object.keys(mapProfile).length === 0) return z
  // Copy values per profile mappings
  Object.keys(mapProfile).forEach(k => {
    const rule = mapProfile[k]
    const newValue =
      typeof rule === 'function' ? rule(from, z) : get(from, rule)
    set(z, k, newValue)
  })
  // return new object
  return z
}

export { mapper }
