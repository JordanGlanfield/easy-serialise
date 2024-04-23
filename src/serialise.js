function generateIntermediate(ref, obIntermediates, fields) {
    const intermediate = {
        ...fields,
        id: obIntermediates.size
    }

    obIntermediates.set(ref, intermediate)

    return intermediate
}

function isReference(value) {
    return typeof value === 'object'
}

function serialiseArray(array, obIntermediates) {
    const intermediate = generateIntermediate(array, obIntermediates, {
        elements: []
    })

    for (const element of array) {
        if (isReference(element)) {
            serialiseReference(element, obIntermediates)
            intermediate.elements.push({ reference: obIntermediates.get(element).id })
        } else {
            intermediate.elements.push({ value: element })
        }
    }
}

function serialiseOb(ob, obIntermediates) {
    const intermediate = generateIntermediate(ob, obIntermediates, {
        rawFields: {},
        references: {}
    })

    for (const [key, value] of Object.entries(ob)) {
        if (isReference(value)) {
            serialiseReference(value, obIntermediates)
            intermediate.references[key] = obIntermediates.get(value).id
        } else {
            intermediate.rawFields[key] = value
        }
    }
}

function serialiseReference(ref, obIntermediates) {
    if (obIntermediates.has(ref)) {
        return
    }

    if (ref instanceof Array) {
        serialiseArray(ref, obIntermediates)
    } else {
        serialiseOb(ref, obIntermediates)
    }
}

export function serialise(entryPoint) {
    const obIntermediates = new Map()

    serialiseReference(entryPoint, obIntermediates)

    return [...obIntermediates.values()]
}

export default serialise
