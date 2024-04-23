import { describe, expect, it } from 'vitest'
import serialise from './serialise.js'

describe('serialise object', () => {
    it("preserves an object's raw fields", () => {
        const ob = {
            name: 'Dan',
            health: 100,
            isAlive: true
        }

        const result = serialise(ob)

        expect(result).toMatchObject([
            {
                id: 0,
                rawFields: {
                    ...ob
                }
            }
        ])
    })

    it('flattens object hierarchies', () => {
        const ob = {
            name: 'Ed',
            friend: {
                name: 'Ben'
            }
        }

        const result = serialise(ob)

        expect(result).toMatchObject([
            {
                id: 0,
                rawFields: {
                    name: 'Ed'
                },
                references: {
                    friend: 1
                }
            },
            {
                id: 1,
                rawFields: {
                    name: 'Ben'
                }
            }
        ])
    })

    it('resolves circular references', () => {
        const ob1 = {
            name: 'Darren'
        }

        ob1.friend = {
            name: 'Terrence',
            friend: ob1
        }

        const result = serialise(ob1)

        expect(result).toMatchObject([
            {
                id: 0,
                rawFields: {
                    name: 'Darren'
                },
                references: {
                    friend: 1
                }
            },
            {
                id: 1,
                rawFields: {
                    name: 'Terrence'
                },
                references: {
                    friend: 0
                }
            }
        ])
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
