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

export function serialise(ob) {
    const obIntermediates = new Map()

    serialiseOb(ob, obIntermediates)

    return [...obIntermediates.values()]
}

export default serialise
