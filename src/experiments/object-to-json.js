function serialiseOb(ob, obIntermediates) {
    if (obIntermediates.has(ob)) {
        return
    }

    const intermediate = {
        id: obIntermediates.size,
        rawFields: {},
        references: {}
    }

    obIntermediates.set(ob, intermediate)

    Object.entries(ob).forEach(([key, value]) => {
        if (typeof value === 'object') {
            serialiseOb(value, obIntermediates)
            intermediate.references[key] = obIntermediates.get(value).id
        } else {
            intermediate.rawFields[key] = value
        }
    })
}

function serialise(ob) {
    const obIntermediates = new Map()

    serialiseOb(ob, obIntermediates)

    return [...obIntermediates.values()]
}

const ob1 = {
    name: 'Fred',
    health: 100
}

const ob2 = {
    name: 'Darren',
    health: 70
}

ob1.enemy = ob2
ob2.enemy = ob1

console.log(JSON.stringify(serialise(ob1), null, 2))
