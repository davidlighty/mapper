import theoretically from 'jest-theories'
import { mapper } from '.'

describe('mapper tests', () => {
  describe('getProp tests', () => {
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
      prop2: 'obj.prop2'
    }

    const expected = {
      name: 'a',
      prop1: 'b',
      prop2: 'c'
    }

    const theories = [
      { input: a, profile: mapProfile, expected },
      { input: a, profile: null, expected: {} }
    ]

    theoretically(
      'translated via the profile to a new object',
      theories,
      theory => {
        const output = mapper(theory.input, {}, theory.profile)
        expect(output).toEqual(theory.expected)
      }
    )

    it('can handle missing properties', () => {
      delete a.name
      expected.name = undefined
      const output = mapper(a, {}, mapProfile)
      expect(output).toEqual(expected)
    })

    it('keeps custom properties', () => {
      const to = {
        test: 'test'
      }
      expected.test = 'test'
      const output = mapper(a, to, mapProfile)
      expect(output).toEqual(expected)
    })
  })
})
