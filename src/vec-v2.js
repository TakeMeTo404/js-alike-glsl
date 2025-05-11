import { operations, rgba, xyzw } from './const'

let assertAll = true

const createCallableVector = (values) => {
    return (op, other) => {
        // todo: assert args

        const isAssignOperation = !(op in operations)

        const f = isAssignOperation ? operations[op[0]] : operations[op]

        const otherAt = typeof other === 'number' ?
            () => other :
            (i) => other[i]

        if (isAssignOperation) {
            for (let i = 0; i < values.length; i++) {
                values[i] = f(values[i], otherAt(i))
            }
        } else {
            const newValues = new Array(values.length)
            for (let i = 0; i < values.length; i++) {
                newValues[i] = f(values[i], otherAt(i))
            }

            if (values.length === 2) {
                return vec2(newValues)
            } else if (values.length === 3) {
                return vec3(newValues)
            } else {
                return vec4(newValues)
            }
        }
    }
}

const defineIndexProperties = (vec) => {
    for (let i = 0; i < vec.values.length; i++) {
        Object.defineProperty(vec, i, {
            get() {
                return vec.values[i]
            },

            set(v) {
                vec.values[i] = v
            }
        })
    }
}

const utils = {
    xyzwIndexRecord: {
        'x': 0,
        'y': 1,
        'z': 2,
        'w': 3
    },

    rgbaIndexRecord: {
        'r': 0,
        'g': 1,
        'b': 2,
        'a': 3
    },

    selectionToIndexes: (selection) => {
        const indexes = new Array(selection.length)

        const isXyzw = xyzw.includes(selection[0])
        for (let i = 0; i < indexes.length; i++) {
            indexes[i] = isXyzw ? utils.xyzwIndexRecord[selection[i]] : utils.rgbaIndexRecord[selection[i]]
        }

        return indexes
    }
}

const defineCopy = (vec) => {
    if (vec.values.length === 2) {
        vec.copy = () => vec2([...vec.values])
    } else if (vec.values.length === 3) {
        vec.copy = () => vec3([...vec.values])
    } else {
        vec.copy = () => vec4([...vec.values])
    }
}

const defineGet = (vec) => {
    vec.get = (selection) => {
        // todo: assert args
        const iArr = utils.selectionToIndexes(selection)
        const vArr = iArr.map(i => vec.values[i])

        switch (selection.length) {
            case 1: return vArr[0]
            case 2: return vec2(...vArr)
            case 3: return vec3(...vArr)
            case 4: return vec4(...vArr)
        }
    }
}

const defineSet = (vec) => {
    vec.set = (selection, other) => {
        // todo: assert args

        const iArr = utils.selectionToIndexes(selection)

        const otherAt = typeof other === 'number' ?
            () => other :
            (i) => other[i]

        for (let i = 0; i < iArr.length; i++) {
            vec.values[iArr[i]] = otherAt(i)
        }
    }
}

const parseValues = (n) => (...args) => {
    // todo: assert args

    const values = new Array(n)

    if (args.length === 1 && typeof args[0] === 'number') {
        for (let i = 0; i < n; i++) {
            values[i] = args[0]
        }
    } else if (args.length === n) {
        for (let i = 0; i < n; i++) {
            values[i] = args[i]
        }
    } else if ('x' in args[0]) {
        for (let i = 0; i < n; i++) {
            values[i] = args[0][xyzw[i]]
        }
    } else if ('r' in args[0]) {
        for (let i = 0; i < n; i++) {
            values[i] = args[0][rgba[i]]
        }
    } else {
        for (let i = 0; i < n - 1; i++) {
            values[i] = args[0][i]
        }
        values[n -1] = args[1]
    }
    return values
}

const vec = (n) => (...args) => {
    const values = parseValues(n)(...args)


    const v = createCallableVector(values)
    // @ts-ignore
    v.values = values

    defineCopy(v)

    defineIndexProperties(v)

    defineGet(v)
    defineSet(v)

    return v
}

export const vec2 = vec(2)
export const vec3 = vec(3)
export const vec4 = vec(4)
