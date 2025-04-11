import { ArrayOfLength } from "../utils/ts-array"
import { Sum } from "../utils/ts-number"
import type { GenVectorType, Vec2, Vec3, Vec4 } from "../vec"

type GenType<T extends number | Vec2 | Vec3 | Vec4> =
    T extends number ? number : T

export type UnaryOperator<HyperparametersCount extends 0 | 1 | 2 = 0> = {
    <T extends number | Vec2 | Vec3 | Vec4>(
        ...args: ArrayOfLength<GenType<T>, Sum<1, HyperparametersCount>>
    ):  GenType<T>
}

export type BinaryOperator<HyperparametersCount extends 0 | 1 | 2 = 0> = {
    <T extends number | Vec2 | Vec3 | Vec4>(
        ...args: ArrayOfLength<GenType<T>, Sum<2, HyperparametersCount>>
    ):  GenType<T>
}

type InvarianceType = 'vec-or-num' | 'only-vec' | 'only-num'
type ResultType = 'vec' | 'number'

// type ArgsType<Args extends InvarianceType[]> =

type ArgType<T extends GenVectorType, I extends InvarianceType> =
    I extends 'only-num' ? number :
    I extends 'only-vec' ? T :
    I extends 'vec-or-num' ? number | T :
    never

type ArgsTypes<T extends GenVectorType, II extends InvarianceType[], Acc extends any[] = []> =
    II['length'] extends 0
        ? Acc
        : II extends [infer Head, ...infer Tail]
            ? Head extends InvarianceType
                ? Tail extends InvarianceType[]
                    ? ArgsTypes<T, Tail, [...Acc, ArgType<T, Head>]>
                    : never
                : never
            : never


// export type Operator<OperandType extends GenVectorType, II extends InvarianceType[], Result extends ResultType> = {
//     <T extends OperandType> (
//         ...args: [
//             T,
//             ...ArgsTypes<T, II>
//         ]
//     ): Result extends 'vec' ? T : number
// }
export type Operator<OperandType extends GenVectorType, II extends InvarianceType[], Result extends ResultType> = {
    <T extends OperandType> (
        ...args: [
            T,
            ...ArgsTypes<T, II>
        ]
    ): Result extends 'vec' ? T : number
}

type SimpleOperator = <T extends GenVectorType, ExtraArgsCount extends 0 | 1 | 2>(
    ...args: [
        T,
        ...ArrayOfLength<T | number, ExtraArgsCount>
    ]
) => T

export const simpleOperator = <ExtraArgsCount extends 0 | 1 | 2> (
    extraArgsCount: ExtraArgsCount,
    func: (...args: ArrayOfLength<number, ExtraArgsCount>) => number
): SimpleOperator => {
    return (...args) => {
        return args[0]
    }
}

const sin = simpleOperator(0, Math.sin)


sin(4)
const a = sin(vec4(4))

export const clamp = <V extends number | Vec2 | Vec3 | Vec4>(
    x: V,
    min: number | NoInfer<V>,
    max: number | NoInfer<V>,
): V => {
    throw new Error('not implemented')
}

export const mix = <V extends number | Vec2 | Vec3 | Vec4>(
    x: V,
    y: NoInfer<V>,
    t: number | NoInfer<V>,
): V => {
    throw new Error('not implemented')
}

clamp(vec2(0), vec2(1), 5)

mix(1, 2, .5)

interface Smoothstep {
    <T extends GenVectorType>(
        edge0: number | NoInfer<T>,
        edge1: number | NoInfer<T>,
        v: T
    ): T
}
const smoothstep: Smoothstep = (edge0, edge1, v) => {
    return v
}

const res = smoothstep(vec2(2), 3, vec3(7))


// trigonometry
declare global {

}

const t1 = tan(1)
const t2 = tan(vec2(2))
const t3 = tan(vec3(2))
const t4 = tan(vec4(2))


// export type Operator<Args extends InvarianceType[]> = {
//     <T extends GenVectorType> (
//         ...args:
//     ): GenType<T>
// }

// export type Operator = <T extends GenVectorType, Args extends Array<string>> ()

const sin1: number = sin(Math.PI)
const sin2: Vec2 = sin(vec2(0))
const sin3: Vec3 = sin(vec3(0))
const sin4: Vec4 = sin(vec4(0))

const pow1: number = pow(2, 3)
const pow2: Vec2 = pow(vec2(3), vec2(2))
const pow2_2: Vec2 = pow(vec2(3), 2)
const pow3: Vec3 = pow(vec3(3), vec3(3))
const pow3_2: Vec3 = pow(vec3(3), 3)
const pow4: Vec4 = pow(vec4(0), vec4(-1))
const pow4_2: Vec4 = pow(vec4(0), -1)

// type OperatorCreateArgs



const operator = <
    FromSize extends string,
    ArgsInvariance extends InvarianceType[]
> (
    t: OperandType, argsInvariance: ArgsInvariance
) => {

}

/* const pow = operator({
fromSize: '1234'
extraArgsSizes: ['same', 'same-or-number', 'number']
resultSize: 'same',
func: (a: number, b: number, c: number) => number
})

*/

// declare global {
//     const radians: Operator<>
// }
