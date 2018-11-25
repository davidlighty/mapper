import theoretically from 'jest-theories'
import { mapper } from '.'

describe('mapper tests', () => {
  // payload
  const a = {
    name: 'a',
    obj: {
      prop1: 'b',
      prop2: 'c'
    }
  }

  const mapProfile = {
    name: 'name',
    prop1: 'obj.prop1',
    prop2: 'obj.prop2',
    'obj.name': 'name'
  }

  describe('can handle profiles', () => {
    const expected = {
      name: 'a',
      prop1: 'b',
      prop2: 'c',
      obj: {
        name: 'a'
      }
    }
    const theories = [
      { from: a, profile: mapProfile, expected },
      { from: a, profile: null, expected: {} }
    ]

    theoretically(
      'translated via the profile to a new object',
      theories,
      theory => {
        const output = mapper(theory.from, {}, theory.profile)
        expect(output).toEqual(theory.expected)
      }
    )

    it('can map with a custom function', () => {
      const profile = {
        name: from => `${from.first} ${from.last}`
      }
      const from = {
        first: 'Bruce',
        last: 'Wayne'
      }
      const result = {
        name: 'Bruce Wayne'
      }
      const output = mapper(from, null, profile)
      expect(output).toEqual(result)
    })
  })

  describe('can handle destination object rules', () => {
    const expected = {
      name: 'a',
      prop1: 'b',
      prop2: 'c',
      obj: {
        name: 'a'
      }
    }

    const theories = [
      { to: {}, expected },
      { to: undefined, expected },
      { to: null, expected }
    ]

    theoretically(
      'will create a destination object if null or void',
      theories,
      theory => {
        const output = mapper(a, theory.to, mapProfile)
        expect(output).toEqual(theory.expected)
      }
    )

    it('keeps custom properties', () => {
      const to = {
        test: 'test'
      }
      expected.test = 'test'
      const output = mapper(a, to, mapProfile)
      expect(output).toEqual(expected)
    })
  })

  describe('can handle incoming object', () => {
    it('can handle missing properties', () => {
      delete a.name
      const expected = {
        name: undefined,
        prop1: 'b',
        prop2: 'c',
        obj: {
          name: undefined
        }
      }
      const output = mapper(a, {}, mapProfile)
      expect(output).toEqual(expected)
    })
  })
})
