import { rgba, xyzw } from "../../const";
import { AnyNumberZeroToN } from "../utils/ts-number";
import type { Vec2, Vec3, Vec4 } from '.'
import { ArrayOfLength } from "../utils/ts-array";

export type XYZW_ContructorArgs<N extends 2 | 3 | 4> =
    N extends 2 ? Record<typeof xyzw[AnyNumberZeroToN<2>], number> :
    N extends 3 ? Record<typeof xyzw[AnyNumberZeroToN<3>], number> :
    N extends 4 ? Record<typeof xyzw[AnyNumberZeroToN<4>], number> :
    never

export type RGBA_ContructorArgs<N extends 2 | 3 | 4> =
    N extends 2 ? Record<typeof rgba[AnyNumberZeroToN<2>], number> :
    N extends 3 ? Record<typeof rgba[AnyNumberZeroToN<3>], number> :
    N extends 4 ? Record<typeof rgba[AnyNumberZeroToN<4>], number> :
    never

type FromSmallerVectorAndNumber<N extends 2 | 3 | 4> =
    N extends 2 ? never :
    N extends 3 ? [Vec2, number] :
    N extends 4 ? [Vec3, number] :
    never

export type ConstructorArgs<N extends 2 | 3 | 4> =
    | [number]
    | ArrayOfLength<number, N>
    | [XYZW_ContructorArgs<N>]
    | [RGBA_ContructorArgs<N>]
    | FromSmallerVectorAndNumber<N>
