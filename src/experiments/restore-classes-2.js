const constructors = {
    Map: () => new Map(),
    WeakMap: () => WeakMap(),
    Set: () => new Set(),
    Symbol: (intermediate) => {
        // if (intermediate.global) { return Symbol.for(intermediate.description) }
        return Symbol(intermediate.description)
    },
    Monster: () => new Monster()
}

class Monster {

}