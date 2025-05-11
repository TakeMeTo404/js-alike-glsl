import { max, mix } from './types/operators'
import type { GenVectorType, Vec2, Vec3, Vec4 } from './types/vec'
import { ConstructorArgs } from './types/vec/constructor'
import { is, vec2, vec3, vec4 } from './vec'

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
    // else if (is.vec2(v1) && is.vec2(v2)) {
    //     return assertArraysEqual(

    //     )
    // }
    // else if (is.vec3(v1) && is.vec3(v2)) {
    //     return `vec3(${v[0]}, ${v[1]}, ${v[2]})`
    // }
    // else if (is.vec4(v1) && is.vec4(v2)) {
    //     return `vec4(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`
    // }
}

const range = (n: number): number[] => {
    return [...new Array(n)].map((_, i) => i)
}

let test = true
if (test) {
    const ways2: Array<() => Vec2> = [
        () => vec2(10),
        () => vec2(10, 10),
        () => vec2({ x: 10, y: 10 }),
        () => vec2({ r: 10, g: 10 }),

        () => vec2(0)('-', vec2(10))('*', -1),

        () => vec3(10).get('xx'),

        () => {
            const one = vec3(1)

            one[0] = 3
            one.set('y', 2)

            const two = vec2(0)
            two[0] = one[0] + one.get('y') + one.get('b') + 4

            one.set('zx', vec2(-1, -5))

            two[1] = one[0] * one.get('g') * one.get('b')

            return two
        }
    ]

    range(ways2.length).forEach(i => {
        range(ways2.length).forEach(j => {
            assertEquals(ways2[i](), ways2[j]())
        })
    })
}

let red = vec3({ r: 255, g: 0, b: 0 })
const green = vec3(0)
green.set('g', 255)
const blue = vec3(0, 0, 255)

// console.log('red\t', toString(red))
// console.log('green\t', toString(green))
// console.log('blue\t', toString(blue))


// const violet: Vec3 = max(red, blue)

// линейная интерполяция между цветами
// requestAnimationFrame(function loop() {

//     const seconds = Date.now() / 1000

//     let t = Math.sin(seconds)
//     t = (t + 1) / 2
//     // now t between 0 and 1

//     const fromRedToGreen = mix(red, green, vec3(t))

//     someDiv.style.backgroundColor = toCssColor(fromRedToGreen)

//     requestAnimationFrame(loop)
// })
// declare const someDiv: HTMLDivElement
// declare const toCssColor: (vec3: Vec3) => string


const up = vec2(0, 1)
const right = vec2(1, 0)
const down = vec2(0, -1)
const left = vec2(-1, 0)

// two up, three left
const jump = up('*', 2)('+', left('*', 3))

console.log('\njump\t', toString(jump))

jump('*=', -1)
console.log('\njump\t', toString(jump))

// M на N, где M – количество строк, N – количество столбцов

// mat3x3.set(0, vec3(7))
// mat3x3.set([0, 1], [vec3(7), vec3(-7)]) // set 1 column to sevens, second column to minus-sevens
// mat3x3.set([0, 1], someMat2x3)
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
