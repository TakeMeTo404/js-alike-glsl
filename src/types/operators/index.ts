import { ArrayOfLength } from "../utils/ts-array"
import { Sum } from "../utils/ts-number"
import type { Vec2, Vec3, Vec4 } from "../vec"

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

const sin1: number = sin(Math.PI)
const sin2: Vec2 = sin(vec2(0))
const sin3: Vec3 = sin(vec3(0))
const sin4: Vec4 = sin(vec4(0))

const pow1: number = pow(2, 3)
const pow2: Vec2 = pow(vec2(3), vec2(2))
const pow3: Vec3 = pow(vec3(3), vec3(3))
const pow4: Vec4 = pow(vec4(0), vec4(-1))
