import { describe, expect, it } from 'vitest'

import serialise from './serialise.js'
import { customTestCases, testCases } from './test-cases.js'

describe('serialise object', () => {
    it.each(testCases.objects)('serialises $description correctly', ({ original, serialised }) => {
        const result = serialise(original)

        expect(result).toMatchObject(serialised)
    })
})

describe('serialise array', () => {
    it.each(testCases.arrays)('serialises $description correctly', ({ original, serialised }) => {
        const result = serialise(original)

        expect(result).toMatchObject(serialised)
    })

    it.each([customTestCases.arrays.circular])('serialises $description correctly', ({ original, serialised }) => {
        const result = serialise(original)

        expect(result).toMatchObject(serialised)
    })
})
