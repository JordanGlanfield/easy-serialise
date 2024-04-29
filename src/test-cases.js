const darren = {
    name: 'Darren'
}

darren.friend = {
    name: 'Terrence',
    friend: darren
}

const arrayWithCircularReference = [
    1,
    {
        name: 'Alexa'
    }
]

arrayWithCircularReference[1].owner = arrayWithCircularReference

export const testCases = {
    objects: [
        {
            description: 'object with primitives',
            original: {
                name: 'Dan',
                health: 100,
                isAlive: true
            },
            serialised: [
                {
                    id: 0,
                    rawFields: {
                        name: 'Dan',
                        health: 100,
                        isAlive: true
                    }
                }
            ]
        },
        {
            description: 'nested objects',
            original: {
                name: 'Ed',
                friend: {
                    name: 'Ben'
                }
            },
            serialised: [
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
            ]
        },
        {
            description: 'nested objects with circular references',
            original: darren,
            serialised: [
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
            ]
        }
    ],
    arrays: [
        {
            description: 'array with primitives',
            original: [1, 'banter', false],
            serialised: [
                {
                    id: 0,
                    elements: [{ value: 1 }, { value: 'banter' }, { value: false }]
                }
            ]
        },
        {
            description: 'array with objects',
            original: [
                1,
                {
                    name: 'Alexandria'
                },
                'hello'
            ],
            serialised: [
                {
                    id: 0,
                    elements: [{ value: 1 }, { reference: 1 }, { value: 'hello' }]
                },
                {
                    id: 1
                }
            ]
        },
        {
            description: 'array with circular references',
            original: arrayWithCircularReference,
            serialised: [
                {
                    id: 0,
                    elements: [{ value: 1 }, { reference: 1 }]
                },
                {
                    id: 1,
                    references: {
                        owner: 0
                    }
                }
            ]
        }
    ]
}
