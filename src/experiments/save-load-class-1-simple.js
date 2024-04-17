class Monster {
    health = 100
    type
    name
    damagePerHit = 0
    damageType = 'slash'

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

const blob = new Blob('Fred')

blob.battleCry()
blob.idleNoise()

const blobSaved = JSON.stringify(blob)
const rawBlobLoaded = JSON.parse(blobSaved)
const blobLoaded = new Blob()

// Loading an object with a specific class https://stackoverflow.com/questions/5873624/parse-json-string-into-a-particular-object-prototype-in-javascript

Object.assign(blobLoaded, rawBlobLoaded)

blobLoaded.battleCry()
blobLoaded.idleNoise()

console.log(JSON.stringify(Object.keys(blob)))
console.log(JSON.stringify(Object.keys(blobLoaded)))
