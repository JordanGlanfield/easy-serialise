
function instantiateObjects(intermediates) {
    const idsToObjectData = new Map()

    for (const intermediate of intermediates) {
        // TODO - will need to differentiate this step based on data type
        idsToObjectData.set(intermediate.id, {
            deserialisationData: {

            },
            value: {
                ...intermediate.rawFields
            }
        })
    }

    return idsToObjectData
}

function resolveReferences(intermediates, idsToObjectData) {
    for (const intermediate of intermediates) {
        const objectData = idsToObjectData.get(intermediate.id)

        if (intermediate.references) {
            for (const [key, id] of Object.entries(intermediate.references)) {
                objectData.value[key] = idsToObjectData.get(id).value
            }
        }
    }
}


export function deserialise(intermediates) {
    const idsToObjectData = instantiateObjects(intermediates)

    resolveReferences(intermediates, idsToObjectData)

    return idsToObjectData.get(intermediates[0].id).value
}

export default deserialise