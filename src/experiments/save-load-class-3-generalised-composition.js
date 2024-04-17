import { applyClass } from './apply-class.js'

class Monster {
    health = 100
    type
    name
    damagePerHit = 0
    damageType = 'slash'
    enemy

    constructor(type, name) {
        this.type = type
        this.name = name
    }

    battleCry() {
        console.log(this.name)
    }

    idleNoise() {
        console.log('Grrrrrrr')
    }
}

class Blob extends Monster {
    constructor(name) {
        super('Blob', name)
        this.health = 20
        this.damagePerHit = 1
        this.damageType = 'acid'
    }

    idleNoise() {
        console.log('Oooooozzzzzeeee')
    }
}

const blob1 = new Blob('Fred')
const blob2 = new Blob('Ed')

function createIntermediate(ob) {
    const intermediate = Object.assign(ob)
    intermediate.easySerialise = {}

    Object.entries(intermediate).forEach(([key, value]) => {
        if (typeof value === 'object') {
            const constructorName = value.constructor.name
            intermediate.easySerialise.key = {
                constructorName
            }
        }
    })
}
