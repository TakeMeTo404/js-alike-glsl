import type { GenVectorType, Vec2, Vec3, Vec4 } from './types/vec'
import { is } from './vec'
import { vec2, vec3, vec4 } from './vec-v2'

const toString = (v: GenVectorType): string => {
    if (typeof v === 'number') {
        return `Number(${v})`
    }
    else if (is.vec2(v)) {
        return `vec2(${v[0]}, ${v[1]})`
    }
    else if (is.vec3(v)) {
        return `vec3(${v[0]}, ${v[1]}, ${v[2]})`
    }
    else if (is.vec4(v)) {
        return `vec4(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`
    }
    throw new Error()
}

const assertArraysEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) {
        throw new Error()
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
                throw new Error()
            }
    }
}

const assertEquals = (v1: GenVectorType, v2: GenVectorType): void => {
    if (typeof v1 === 'number' && typeof v2 === 'number') {
        assertArraysEqual([v1], [v2])
    }
    return assertArraysEqual((v1 as any).values, (v2 as any).values)
}

const range = (n: number): number[] => {
    return [...new Array(n)].map((_, i) => i)
}

let test = true
if (test) {
    const ways2: Array<() => Vec2> = [
        // () => vec2(10),
        () => vec2(10, 10),
        // () => vec2({ x: 10, y: 10 }),
        // () => vec2({ r: 10, g: 10 }),

        // () => vec2(0)('-', vec2(10))('*', -1),

        // () => vec3(10).get('xx'),

        // () => {
        //     const one = vec3(1)

        //     one[0] = 3
        //     one.set('y', 2)

        //     const two = vec2(0)
        //     two[0] = one[0] + one.get('y') + one.get('b') + 4

        //     one.set('zx', vec2(-1, -5))

        //     two[1] = one[0] * one.get('g') * one.get('b')

        //     return two
        // }
    ]

    console.log('call', ways2[0]())
    range(ways2.length).forEach(i => {
        range(ways2.length).forEach(j => {
            assertEquals(ways2[i](), ways2[j]())
        })
    })
}
