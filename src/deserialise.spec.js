import { describe, expect, it } from 'vitest'

import deserialise from './deserialise.js'
import { customTestCases, testCases } from './test-cases.js'

describe('deserialise object', () => {
    it.each(testCases.objects)('restores $description correctly', ({ original, serialised }) => {
        const result = deserialise(serialised)

        expect(result).toMatchObject(original)
    })
})

describe('deserialise array', () => {
    it.each(testCases.arrays)('restores $description correctly', ({ original, serialised }) => {
        const result = deserialise(serialised)

        expect(result).toMatchObject(original)
    })

    it("restores 'array with circular references' correctly", () => {
        const testCase = customTestCases.arrays.circular
        const result = deserialise(testCase.serialised)

        expect(result.length).toBe(2)
        expect(result[0]).toEqual(testCase.original[0])
        expect(result[1].name).toEqual(testCase.original[1].name)
        expect(result[1].owner).toBe(result)
    })
})
