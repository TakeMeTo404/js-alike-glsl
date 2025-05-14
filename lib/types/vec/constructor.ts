import type { Vec2, Vec3 } from '.'
import { ArrayOfLength } from "../utils/ts-array";

export type XYZW_ContructorArgs<N extends 2 | 3 | 4> =
    N extends 2 ? Record<'x' | 'y', number> :
    N extends 3 ? Record<'x' | 'y' | 'z', number> :
    N extends 4 ? Record<'x' | 'y' | 'z' | 'w', number> :
    never

export type RGBA_ContructorArgs<N extends 2 | 3 | 4> =
    N extends 2 ? Record<'r' | 'g', number> :
    N extends 3 ? Record<'r' | 'g' | 'b', number> :
    N extends 4 ? Record<'r' | 'g' | 'b' | 'a', number> :
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
