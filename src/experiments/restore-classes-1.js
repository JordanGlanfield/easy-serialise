/* const obs = [{}, [], new Map(), new WeakMap(), new Set(), Symbol('hey')] */

const obs = [{}, [], new Map(), new WeakMap(), new Set()]

function printClasses(obs) {
    /* obs.forEach(ob => console.log(typeof ob)) */
    obs.forEach(ob => console.log(ob.constructor.name))
}

const newObs = obs.map(ob => {
    const newOb = eval(`new ${ob.constructor.name}()`)
    Object.assign(newOb, ob)
    return newOb
})

printClasses(obs)
console.log('------')
printClasses(newObs)

console.log(JSON.stringify(obs) === JSON.stringify(newObs))