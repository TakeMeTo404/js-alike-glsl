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

toString.haha = 'hahaha'

console.log(toString    )




let red = vec3({ r: 255, g: 0, b: 0 })
const green = vec3(0)
green.set('g', 255)
const blue = vec3(0, 0, 255)

console.log('red\t', toString(red))
console.log('green\t', toString(green))
console.log('blue\t', toString(blue))


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

console.log('hello')
console.log(vec2(1))
// const up = vec2(0, 1)
// const right = vec2(1, 0)
// const down = vec2(0, -1)
// const left = vec2(-1, 0)

// two up, three left
// const jump = up('*', 2)('+', left('*', 3))

// M на N, где M – количество строк, N – количество столбцов

// mat3x3.set(0, vec3(7))
// mat3x3.set([0, 1], [vec3(7), vec3(-7)]) // set 1 column to sevens, second column to minus-sevens
// mat3x3.set([0, 1], someMat2x3)
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
