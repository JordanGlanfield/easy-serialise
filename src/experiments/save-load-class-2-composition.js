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

blob1.enemy = blob2
blob1.enemy.battleCry()
blob1.enemy.idleNoise()

const blobSaved = JSON.stringify(blob1)
const rawBlobLoaded = JSON.parse(blobSaved)
const blobLoaded = applyClass(rawBlobLoaded, Blob)
blobLoaded.enemy = applyClass(blobLoaded.enemy, Blob)

blobLoaded.enemy.battleCry()
blobLoaded.enemy.idleNoise()

console.log(JSON.stringify(blob1))
console.log(JSON.stringify(blobLoaded))
