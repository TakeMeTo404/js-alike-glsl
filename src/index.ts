import { BinaryOperator, UnaryOperator, Operator } from './types/operators'
import type { GenVectorType, Vec2, Vec3, Vec4 } from './types/vec'
import { ConstructorArgs } from './types/vec/constructor'

declare global {
    const vec2: (...args: ConstructorArgs<2>) => Vec2
    const vec3: (...args: ConstructorArgs<3>) => Vec3
    const vec4: (...args: ConstructorArgs<4>) => Vec4
}


declare global {
    const sin: UnaryOperator
    // const pow: UnaryOperator<1>

    const max: BinaryOperator
    const mix: BinaryOperator<1>
}

// GEOMETRIC FUNCTIONS
declare global {
    const len: <T extends GenVectorType>(v: T) => number
    const distance: <T extends GenVectorType>(v1: T, v2: T) => number
    const dot: <T extends GenVectorType>(v1: T, v2: T) => number
    const cross: (v1: Vec3, v2: Vec3) => Vec3
    const normalize: <T extends GenVectorType>(v: T) => T
    // TODO: faceforward, reflect, refract
}

declare global {
    const pow: Operator<GenVectorType, ['vec-or-num'], 'vec'>
}

const red = vec3({ r: 255, g: 0, b: 0 })
const green = vec3(0).set('g', 255)
const blue = vec3(0, 0, 255)

const violet: Vec3 = max(red, blue)

// линейная интерполяция между цветами
requestAnimationFrame(function loop() {

    const seconds = Date.now() / 1000

    let t = Math.sin(seconds)
    t = (t + 1) / 2
    // now t between 0 and 1

    const fromRedToGreen = mix(red, green, vec3(t))

    someDiv.style.backgroundColor = toCssColor(fromRedToGreen)

    requestAnimationFrame(loop)
})
declare const someDiv: HTMLDivElement
declare const toCssColor: (vec3: Vec3) => string

const up = vec2(0, 1)
const right = vec2(1, 0)
const down = vec2(0, -1)
const left = vec2(-1, 0)

// two up, three left
const jump = up('*', 2)('+', left('*', 3))

// M на N, где M – количество строк, N – количество столбцов

// mat3x3.set(0, vec3(7))
// mat3x3.set([0, 1], [vec3(7), vec3(-7)]) // set 1 column to sevens, second column to minus-sevens
// mat3x3.set([0, 1], someMat2x3)
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
