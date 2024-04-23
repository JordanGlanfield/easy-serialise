import { describe, expect, it } from 'vitest'
import serialise from './serialise.js'
import { testCases } from './test-cases.js'

describe('serialise object', () => {
    it.each(testCases)('serialises $description correctly', ({ original, serialised }) => {
        const result = serialise(original)

        expect(result).toMatchObject(serialised)
    })
})

describe('serialise array', () => {
    it('preserves raw array elements', () => {
        const array = [1, 'banter', false]

        const result = serialise(array)

        expect(result).toMatchObject([
            {
                id: 0,
                elements: [
                    { value: 1 },
                    { value: 'banter' },
                    { value: false }
                ]
            }
        ])
    })

    it('flattens array hierarchy', () => {
        const array = [
            1,
            {
                name: 'Alexandria'
            },
            'hello'
        ]

        const result = serialise(array)

        expect(result).toMatchObject([
            {
                id: 0,
                elements: [
                    { value: 1 },
                    { reference: 1 },
                    { value: 'hello' }
                ]
            },
            {
                id: 1,
            }
        ])
    })

    // TODO - is this duplication?
    it('resolves circular references', () => {
        const array = [
            1,
            {
                name: 'Alexa'
            }
        ]

        array[1].owner = array

        const result = serialise(array)

        expect(result).toMatchObject([
            {
                id: 0,
                elements: [
                    { value: 1 },
                    { reference: 1 }
                ]
            },
            {
                id: 1,
                references: {
                    owner: 0
                }
            }
        ])
    })
})
