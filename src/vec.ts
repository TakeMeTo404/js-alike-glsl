import { ConstructorArgs, RGBA_ContructorArgs, XYZW_ContructorArgs } from "./types/vec/constructor";
import type { GenVectorType, Vec2, Vec3, Vec4, VecN } from './types/vec'
import { ArrayOfLength } from "./types/utils/ts-array";
import { rgba, xyzw } from "./const";
import { Get_XYZW_Selection, Get_RGBA_Selection } from './types/vec/get'
import { Length } from './types/utils/ts-string'
import { AnyNumberZeroToN } from "./types/utils/ts-number";

const isNumberArrayOfLength = <N extends 1 | 2 | 3 | 4>(v: unknown, n: N): v is ArrayOfLength<number, N> => {
    if (!Array.isArray(v)) {
        return false
    }
    if (v.length !== n) {
        return false
    }
    for (let i = 0; i < v.length; i++) {
        if (typeof v[i] !== 'number') {
            return false
        }
    }

    return true
}

const isNumberRecord = <K extends string>(v: unknown, keys: K[]): v is Record<K, number> => {
    if (!v || typeof v !== 'object') {
        return false
    }
    if (Object.keys(v).length !== keys.length) {
        return false
    }

    for (let i = 0; i < keys.length; i++) {
        const at = keys[i] as string
        if (!(at in v) ||
            typeof (v as { [at]: any })[at] !== 'number'
        ) {
            return false
        }
    }

    return true
}


export const is = {
    vecN: <N extends 2 | 3 | 4> (n: N) => (v: unknown): v is VecN<N> => {
        return !!v
            && typeof v === 'object'
            && 'values' in v
            && isNumberArrayOfLength(v['values'], n)
    },

    vec2: (v: unknown) => is.vecN(2)(v),
    vec3: (v: unknown) => is.vecN(3)(v),
    vec4: (v: unknown) => is.vecN(4)(v),

    xyzw: {
        constructorArgs: {
            vecN: <N extends 2 | 3 | 4> (n: N) => (v: unknown): v is XYZW_ContructorArgs<N> => {
                return isNumberRecord(v, xyzw.slice(0, n))
            },

            vec2: (v: unknown) => is.xyzw.constructorArgs.vecN(2)(v),
            vec3: (v: unknown) => is.xyzw.constructorArgs.vecN(3)(v),
            vec4: (v: unknown) => is.xyzw.constructorArgs.vecN(4)(v),
        },

        getSelection: {
            // vecN: <N extends 2 | 3 | 4> (v: unknown, n: N): v is Get_XYZW_Selection<>
        }
    },

    rgba: {
        constructorArgs: {
            vecN: <N extends 2 | 3 | 4> (n: N) => (v: unknown): v is RGBA_ContructorArgs<N> => {
                return isNumberRecord(v, rgba.slice(0, n))
            },

            vec2: (v: unknown) => is.rgba.constructorArgs.vecN(2)(v),
            vec3: (v: unknown) => is.rgba.constructorArgs.vecN(3)(v),
            vec4: (v: unknown) => is.rgba.constructorArgs.vecN(4)(v),
        },
    }
}

const selectionToIndexes = (selection: string): number[] => {
    const indexes = new Array(selection.length)

    for (let i = 0; i < indexes.length; i++) {
        const j = xyzw.indexOf(selection[i] as any)

        indexes[i] = j !== -1 ? j : rgba.indexOf(selection[i] as any)
    }

    return indexes
}

const range = (n: number): number[] => {
    return [...new Array(n)].map((_, i) => i)
}

const indexSignature = <N extends 2 | 3 | 4> (n: N, values: ArrayOfLength<number, N>): Record<AnyNumberZeroToN<N>, number> => {
    const o = {} as Record<AnyNumberZeroToN<N>, number>
    range(n).forEach(i => {
        Object.defineProperty(o, i, {
            get() {
                return values[i]
            },

            set(v) {
                values[i] = v
            }
        })
     })
     return o
}



const _vec2 = (values: [number, number]): Vec2 => {
    let v: Vec2 = indexSignature(2, values) as Vec2

    v.values = values
    v.copy = () => _vec2([...values])

    v.get = (selection) => {
        const iArr = selectionToIndexes(selection)
        const vArr = iArr.map(i => values[i])

        switch (selection.length) {
            case 1: return vArr[0] as VecN<Length<typeof selection>>
            case 2: return vec2(...vArr as ArrayOfLength<number, 2>) as VecN<Length<typeof selection>>
            case 3: return vec3(...vArr as ArrayOfLength<number, 3>) as VecN<Length<typeof selection>>
            case 4: return vec4(...vArr as ArrayOfLength<number, 4>) as VecN<Length<typeof selection>>
            default: throw new RangeError()
        }
    }

    v.set = (selection, v) => {
        const iArr = selectionToIndexes(selection)

        switch (selection.length) {
            case 1:
                 values[iArr[0]] = v as number
                 break
             case 2:
                 [0, 1].forEach(i => {
                     values[iArr[i]] = (v as Vec2).values[i]
                 })
                 break
             default: throw new RangeError()
        }
    }

    return v
}

export const vec2 = (...args: ConstructorArgs<2>): Vec2 => {
    let values: [number, number]

    if (isNumberArrayOfLength(args, 1)) {
        values = [args[0], args[0]]
    } else if (args.length === 2 && isNumberArrayOfLength(args, 2)) {
        values = [args[0], args[1]]
    } else if (args.length === 1 && is.xyzw.constructorArgs.vec2(args[0])) {
        values = [args[0]['x'], args[0]['y']]
    } else if (args.length === 1 && is.rgba.constructorArgs.vec2(args[0])) {
        values = [args[0]['r'], args[0]['g']]
    } else {
        throw new TypeError()
    }

    return _vec2(values)

    // return {
    //    values,
    //    copy: () => vec2(...values),
    //    get: (selection) => {
    //        const iArr = selectionToIndexes(selection)
    //        const vArr = iArr.map(i => values[i])

    //        switch (selection.length) {
    //            case 1: return vArr[0] as VecN<Length<typeof selection>>
    //            case 2: return vec2(...vArr as ArrayOfLength<number, 2>) as VecN<Length<typeof selection>>
    //            case 3: return vec3(...vArr as ArrayOfLength<number, 3>) as VecN<Length<typeof selection>>
    //            case 4: return vec4(...vArr as ArrayOfLength<number, 4>) as VecN<Length<typeof selection>>
    //            default: throw new RangeError()
    //        }
    //    },
    //    set: (selection, v) => {
    //        const iArr = selectionToIndexes(selection)

    //        switch (selection.length) {
    //            case 1:
    //                 values[iArr[0]] = v as number
    //                 break
    //             case 2:
    //                 [0, 1].forEach(i => {
    //                     values[iArr[i]] = (v as Vec2).values[i]
    //                 })
    //                 break
    //             default: throw new RangeError()
    //        }
    //    },

    //    ...indexSignature(2, values)
    // }
}

const _vec3 = (values: [number, number, number]): Vec3 => {
    let v: Vec3 = indexSignature(3, values) as Vec3

    v.values = values
    v.copy = () => _vec3([...values])

    v.get = (selection) => {
        const iArr = selectionToIndexes(selection)
        const vArr = iArr.map(i => values[i])

        switch (selection.length) {
            case 1: return vArr[0] as VecN<Length<typeof selection>>
            case 2: return vec2(...vArr as ArrayOfLength<number, 2>) as VecN<Length<typeof selection>>
            case 3: return vec3(...vArr as ArrayOfLength<number, 3>) as VecN<Length<typeof selection>>
            case 4: return vec4(...vArr as ArrayOfLength<number, 4>) as VecN<Length<typeof selection>>
            default: throw new RangeError()
        }
    }

    v.set = (selection, v) => {
        const iArr = selectionToIndexes(selection)

        switch (selection.length) {
            case 1:
                 values[iArr[0]] = v as number
                 break
             case 2:
                 [0, 1].forEach(i => {
                     values[iArr[i]] = (v as Vec2).values[i]
                 })
                 break
             case 3:
                 [0, 1, 2].forEach(i => {
                     values[iArr[i]] = (v as Vec3).values[i]
                 })
                 break
             default: throw new RangeError()
        }
    }

    return v
}

export const vec3 = (...args: ConstructorArgs<3>): Vec3 => {
    let values: [number, number, number]

    if (isNumberArrayOfLength(args, 1)) {
        values = [args[0], args[0], args[0]]
    } else if (args.length === 3 && isNumberArrayOfLength(args, 3)) {
        values = [args[0], args[1], args[2]]
    } else if (args.length === 1 && is.xyzw.constructorArgs.vec3(args[0])) {
        values = [args[0]['x'], args[0]['y'], args[0]['z']]
    } else if (args.length === 1 && is.rgba.constructorArgs.vec3(args[0])) {
        values = [args[0]['r'], args[0]['g'], args[0]['b']]
    } else if(args.length === 2 && typeof args[0] === 'number' && is.vec2(args[1])) {
        values = [args[0], ...args[1].values]
    } else {
        throw new TypeError()
    }

    return _vec3(values)

    // return {
    //    values,
    //    copy: () => vec3(...values),
    //    get: (selection) => {
    //        const iArr = selectionToIndexes(selection)
    //        const vArr = iArr.map(i => values[i])

    //        switch (selection.length) {
    //            case 1: return vArr[0] as VecN<Length<typeof selection>>
    //            case 2: return vec2(...vArr as ArrayOfLength<number, 2>) as VecN<Length<typeof selection>>
    //            case 3: return vec3(...vArr as ArrayOfLength<number, 3>) as VecN<Length<typeof selection>>
    //            case 4: return vec4(...vArr as ArrayOfLength<number, 4>) as VecN<Length<typeof selection>>
    //            default: throw new RangeError()
    //        }
    //    },
    //    set: (selection, v) => {
    //        const iArr = selectionToIndexes(selection)

    //        switch (selection.length) {
    //            case 1:
    //                 values[iArr[0]] = v as number
    //                 break
    //             case 2:
    //                 [0, 1].forEach(i => {
    //                     values[iArr[i]] = (v as Vec2).values[i]
    //                 })
    //                 break
    //             case 3:
    //                 [0, 1, 2].forEach(i => {
    //                     values[iArr[i]] = (v as Vec3).values[i]
    //                 })
    //                 break
    //             default: throw new RangeError()
    //        }
    //    },

    //    ...indexSignature(3, values)
    // }
}

export const vec4 = (...args: ConstructorArgs<4>): Vec4 => {
    let values: [number, number, number, number]

    if (isNumberArrayOfLength(args, 1)) {
        values = [args[0], args[0], args[0], args[0]]
    } else if (args.length === 4 && isNumberArrayOfLength(args, 4)) {
        values = [args[0], args[1], args[2], args[3]]
    } else if (args.length === 1 && is.xyzw.constructorArgs.vec4(args[0])) {
        values = [args[0]['x'], args[0]['y'], args[0]['z'], args[0]['w']]
    } else if (args.length === 1 && is.rgba.constructorArgs.vec4(args[0])) {
        values = [args[0]['r'], args[0]['g'], args[0]['b'], args[0]['a']]
    } else if(args.length === 2 && typeof args[0] === 'number' && is.vec3(args[1])) {
        values = [args[0], ...args[1].values]
    } else {
        throw new TypeError()
    }

    return {
       values,
       copy: () => vec4(...values),
       get: (selection) => {
           const iArr = selectionToIndexes(selection)
           const vArr = iArr.map(i => values[i])

           switch (selection.length) {
               case 1: return vArr[0] as VecN<Length<typeof selection>>
               case 2: return vec2(...vArr as ArrayOfLength<number, 2>) as VecN<Length<typeof selection>>
               case 3: return vec3(...vArr as ArrayOfLength<number, 3>) as VecN<Length<typeof selection>>
               case 4: return vec4(...vArr as ArrayOfLength<number, 4>) as VecN<Length<typeof selection>>
               default: throw new RangeError()
           }
       },
       set: (selection, v) => {
           const iArr = selectionToIndexes(selection)

           switch (selection.length) {
               case 1:
                    values[iArr[0]] = v as number
                    break
                case 2:
                    [0, 1].forEach(i => {
                        values[iArr[i]] = (v as Vec2).values[i]
                    })
                    break
                case 3:
                    [0, 1, 2].forEach(i => {
                        values[iArr[i]] = (v as Vec3).values[i]
                    })
                    break
                case 4:
                    [0, 1, 2, 3].forEach(i => {
                        values[iArr[i]] = (v as Vec4).values[i]
                    })
                    break
                default: throw new RangeError()
           }
       },

       ...indexSignature(4, values)
    }
}
