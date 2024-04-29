import { describe, expect, it } from 'vitest'

import deserialise from './deserialise.js'
import { testCases } from './test-cases.js'

describe('deserialise object', () => {
    it.each(testCases.objects)('restores $description correctly', ({ original, serialised }) => {
        const result = deserialise(serialised)

        expect(result).toMatchObject(original)
    })
})
