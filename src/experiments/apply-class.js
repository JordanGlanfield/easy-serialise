export function applyClass(object, clazz) {
    const newObject = new clazz()

    Object.assign(newObject, object)

    return newObject
}
