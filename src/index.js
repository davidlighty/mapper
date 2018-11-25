// @flow

import { cloneDeep, get } from 'lodash'

const mapTo = (from: Object, to: Object, mapProfile: Object): Object => {
  // Create copy
  const z = cloneDeep(to)
  // Test for profile
  if (!mapProfile || Object.keys(mapProfile).length === 0) return z
  // Copy values per profile mappings
  Object.keys(mapProfile).forEach(k => {
    // copy
    z[k] = get(from, mapProfile[k])
  })
  // return new object
  return z
}

export { mapTo as mapper }
