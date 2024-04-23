const darren = {
    name: 'Darren'
}

darren.friend = {
    name: 'Terrence',
    friend: darren
}


export const testCases = [
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
]