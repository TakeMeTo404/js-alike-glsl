import type { ArrayLengthInRange } from "../ts-array"
import { Compare, NumbersZeroToN, AnyNumberZeroToN, Sum } from "../ts-number"
import { Length, LengthInRange } from "../ts-string"
import type { GetSelection } from "./get"
import type { SetSelection } from "./set"

type NumberArrayOfLength<N extends number> =
    N extends 2 ? [number, number] :
    N extends 3 ? [number, number, number] :
    N extends 4 ? [number, number, number, number] :
    never

type ArrayOfLength<T extends unknown, N extends number> =
    N extends 0 ? [] :
    N extends 1 ? [T] :
    N extends 2 ? [T, T] :
    N extends 3 ? [T, T, T] :
    N extends 4 ? [T, T, T, T] :
    never

type IndexSelection<T extends number, N extends 2 | 3 | 4> =
    Compare<T, N> extends 'less' ? T : never

const xyzw = ['x','y','z','w'] as const
const rgba = ['r','g','b','a'] as const
const operations = {
    ['+']: (a, b) => a + b,
    ['-']: (a, b) => a - b,
    ['*']: (a, b) => a * b,
    ['/']: (a, b) => a / b,
} satisfies Record<string, (a: number, b: number) => number>

type Get_XYZW_Selection<T extends string, N extends 2 | 3 | 4> =
    N extends 2 ? GetSelection<T, typeof xyzw[AnyNumberZeroToN<2>], 1, 4> :
    N extends 3 ? GetSelection<T, typeof xyzw[AnyNumberZeroToN<3>], 1, 4> :
    N extends 4 ? GetSelection<T, typeof xyzw[AnyNumberZeroToN<4>], 1, 4> :
    never

type Get_RGBA_Selection<T extends string, N extends 2 | 3 | 4> =
    N extends 2 ? GetSelection<T, typeof rgba[AnyNumberZeroToN<2>], 1, 4> :
    N extends 3 ? GetSelection<T, typeof rgba[AnyNumberZeroToN<3>], 1, 4> :
    N extends 4 ? GetSelection<T, typeof rgba[AnyNumberZeroToN<4>], 1, 4> :
    never

type Set_XYZW_Selection<T extends string, N extends 2 | 3 | 4> =
N extends 2 ? SetSelection<T, typeof xyzw[AnyNumberZeroToN<2>], 1, 4> :
N extends 3 ? SetSelection<T, typeof xyzw[AnyNumberZeroToN<3>], 1, 4> :
N extends 4 ? SetSelection<T, typeof xyzw[AnyNumberZeroToN<4>], 1, 4> :
    never

type Set_RGBA_Selection<T extends string, N extends 2 | 3 | 4> =
N extends 2 ? SetSelection<T, typeof rgba[AnyNumberZeroToN<2>], 1, 4> :
N extends 3 ? SetSelection<T, typeof rgba[AnyNumberZeroToN<3>], 1, 4> :
N extends 4 ? SetSelection<T, typeof rgba[AnyNumberZeroToN<4>], 1, 4> :
    never

type Vec<N extends 2 | 3 | 4> = {
    values: NumberArrayOfLength<N>

    copy: () => Vec<N>

    get: <T extends number | string>(
        selection:
            T extends number
                ? IndexSelection<T, N>
                : T extends string
                    ? Get_XYZW_Selection<T, N> | Get_RGBA_Selection<T, N>
                    : never
    ) =>
        T extends number
            ? number
            : T extends string
                ? Length<T> extends 1
                    ? number
                    : Length<T> extends 2 | 3 | 4
                        ? Vec<Length<T>>
                        : never
                : never

    set: <T extends number | string>(
        setSelection:
            T extends number
                ? IndexSelection<T, N>
                : T extends string
                    ? Set_XYZW_Selection<T, N> | Set_RGBA_Selection<T, N>
                    : never,

        value:
            T extends number
                ? number
                : T extends string
                    ? Length<T> extends 1
                        ? number
                        : Length<T> extends 2 | 3 | 4
                            ? Vec<Length<T>>
                            : never
                    : never
    ) => Vec<N>
} & {
    [_ in keyof typeof operations]: (other: number | Vec<N>) => Vec<N>
} & {
    [_ in keyof typeof operations as `${_}=`]: (other: number | Vec<N>) => void
} & Record<AnyNumberZeroToN<N>, number>

type Vec2 = Vec<2>
type Vec3 = Vec<3>
type Vec4 = Vec<4>

// export type GenType<N extends number> =
//     N extends 1 ? number :
//     N extends 2 ? Vec2 :
//     N extends 3 ? Vec3 :
//     N extends 4 ? Vec4
//     : never

type XYZW_ContructorArgs<N extends 2 | 3 | 4> =
    N extends 2 ? Record<typeof xyzw[AnyNumberZeroToN<2>], number> :
    N extends 3 ? Record<typeof xyzw[AnyNumberZeroToN<3>], number> :
    N extends 4 ? Record<typeof xyzw[AnyNumberZeroToN<4>], number> :
    never

type RGBA_ContructorArgs<N extends 2 | 3 | 4> =
    N extends 2 ? Record<typeof rgba[AnyNumberZeroToN<2>], number> :
    N extends 3 ? Record<typeof rgba[AnyNumberZeroToN<3>], number> :
    N extends 4 ? Record<typeof rgba[AnyNumberZeroToN<4>], number> :
    never

type FromSmallerVector<N extends 2 | 3 | 4> =
    N extends 2 ? never :
    N extends 3 ? [Vec2, number] :
    N extends 4 ? [Vec3, number] :
    never

type ConstructorArgs<N extends 2 | 3 | 4> =
    | [number]
    | NumberArrayOfLength<N>
    | [XYZW_ContructorArgs<N>]
    | [RGBA_ContructorArgs<N>]
    | FromSmallerVector<N>

declare const vec2: (...args: ConstructorArgs<2>) => Vec2
declare const vec3: (...args: ConstructorArgs<3>) => Vec3
declare const vec4: (...args: ConstructorArgs<4>) => Vec4

const red = vec3({ r: 255, g: 0, b: 0 })
const green = vec3(0).set('g', 255)
const blue = vec3(0, 0, 255)

type GenType<T extends number | Vec2 | Vec3 | Vec4> =
    T extends number ? number : T

type UnaryOperator<HyperparametersCount extends 0 | 1 | 2 = 0> = {
    <T extends number | Vec2 | Vec3 | Vec4>(
        ...args: ArrayOfLength<GenType<T>, Sum<1, HyperparametersCount>>
        // ...args:
        //     T extends number ? ArrayOfLength<number, Sum<1, HyperparametersCount>> :
        //     T extends Vec2 | Vec3 | Vec4 ? ArrayOfLength<T, Sum<1, HyperparametersCount>> :
        //     never
    ):  GenType<T>
}

declare const sin: UnaryOperator
declare const pow: UnaryOperator<1>

const sin1: number = sin(Math.PI)
const sin2: Vec2 = sin(vec2(0))
const sin3: Vec3 = sin(vec3(0))
const sin4: Vec4 = sin(vec4(0))

const pow1: number = pow(2, 3)
const pow2: Vec2 = pow(vec2(3), vec2(2))
const pow3: Vec3 = pow(vec3(3), vec3(3))
const pow4: Vec4 = pow(vec4(0), vec4(-1))

type BinaryOperator<HyperparametersCount extends 0 | 1 | 2 = 0> = {
    <T extends number | Vec2 | Vec3 | Vec4>(
        ...args: ArrayOfLength<GenType<T>, Sum<2, HyperparametersCount>>
        // ...args:
        //     T extends number ? ArrayOfLength<number, Sum<2, HyperparametersCount>> :
        //     T extends Vec2 | Vec3 | Vec4 ? ArrayOfLength<T, Sum<2, HyperparametersCount>> :
        //     never
    ):  GenType<T>
}

declare const max: BinaryOperator
declare const mix: BinaryOperator<1>

// покомпонентно берем максимум
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

vec2(10, -10)
    .copy()
    .get('xxy')

const isNumberArray = (v: unknown) => Array.isArray(v) && v.every(x => typeof x === 'number')


// const createVecFunction = (
//     n: number,
//     extraCoordinates: string[][]
// ) => {
//     return function vecN(values: number[]) {
//         return {
//             values,

//             get: (selection: unknown) => {
//                 if (isNumberArray(selection)) {
//                     if (selection.length === 0) {
//                         throw new Error()
//                     }
//                     if (!selection.every(i => i >= 0 && i < n && i % 1 === 0)) {
//                         throw new Error()
//                     }
//                     return selection.map(i => values[i])
//                 }
//                 if (typeof selection === 'string') {
//                 }
//                 throw new Error()
//             }
//         }
//     }
// }
