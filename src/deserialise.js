function selectIntermediateProcessor(intermediate, processors) {
    let processor = processors.Object

    if (intermediate.type in processors) {
        processor = processors[intermediate.type]
    }

    return processor
}

const objectDataGenerators = {
    Object: (intermediate) => {
        return {
            deserialisationData: {},
            value: {
                ...intermediate.rawFields
            }
        }
    },
    Array: (intermediate) => ({
        deserialisationData: {},
        value: new Array(intermediate.elements.length)
    })
}

function generateObjectData(intermediate) {
    const generator = selectIntermediateProcessor(intermediate, objectDataGenerators)

    return generator(intermediate)
}

function instantiateObjects(intermediates) {
    const idsToObjectData = new Map()

    for (const intermediate of intermediates) {
        const objectData = generateObjectData(intermediate)
        idsToObjectData.set(intermediate.id, objectData)
    }

    return idsToObjectData
}

const referenceResolvers = {
    Object: (intermediate, idsToObjectData) => {
        const objectData = idsToObjectData.get(intermediate.id)

        for (const [key, id] of Object.entries(intermediate.references || {})) {
            objectData.value[key] = idsToObjectData.get(id).value
        }
    },
    Array: (intermediate, idsToObjectData) => {
        const objectData = idsToObjectData.get(intermediate.id)

        intermediate.elements.forEach((element, index) => {
            if (element.reference !== undefined) {
                objectData.value[index] = idsToObjectData.get(element.reference).value
            } else {
                objectData.value[index] = element.value
            }
        })
    }
}

function resolveIntermediateReferences(intermediate, idsToObjectData) {
    const resolver = selectIntermediateProcessor(intermediate, referenceResolvers)

    return resolver(intermediate, idsToObjectData)
}

function resolveReferences(intermediates, idsToObjectData) {
    for (const intermediate of intermediates) {
        resolveIntermediateReferences(intermediate, idsToObjectData)
    }
}

export function deserialise(intermediates) {
    const idsToObjectData = instantiateObjects(intermediates)

    resolveReferences(intermediates, idsToObjectData)

    return idsToObjectData.get(intermediates[0].id).value
}

export default deserialise
