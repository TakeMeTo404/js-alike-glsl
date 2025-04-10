import { Equal, Expect, Not } from "../ts-debug"
import { ConsistsOfUniqueChars, ConsistsOnlyOfChars, Length, LengthInRange } from "../ts-string"
import { Vec2, Vec3, Vec4, VecN } from "./core"

export type SetSelection<T extends string, Coordinates extends string, MinLength extends number, MaxLength extends number> =
    T extends LengthInRange<T, MinLength, MaxLength>
        ? T extends ConsistsOnlyOfChars<T, Coordinates>
            ? T extends ConsistsOfUniqueChars<T>
                ? T
                : never
            : never
        : never

type Set_XYZW_Selection_2D<T extends string> = SetSelection<T, 'x' | 'y', 1, 2>
type Set_XYZW_Selection_3D<T extends string> = SetSelection<T, 'x' | 'y' | 'z', 1, 3>
type Set_XYZW_Selection_4D<T extends string> = SetSelection<T, 'x' | 'y' | 'z' | 'w', 1, 4>

type Set_RGBA_Selection_2D<T extends string> = SetSelection<T, 'r' | 'g', 1, 2>
type Set_RGBA_Selection_3D<T extends string> = SetSelection<T, 'r' | 'g' | 'b', 1, 3>
type Set_RGBA_Selection_4D<T extends string> = SetSelection<T, 'r' | 'g' | 'b' | 'a', 1, 4>

type Vec2Set = <T extends string>(
    selection: Set_XYZW_Selection_2D<T> | Set_RGBA_Selection_2D<T>,
    updater: number | VecN<Length<T>>
) => Vec2
declare const vec2Set: Vec2Set
declare const v2: Vec2
vec2Set('x', 2)
vec2Set('y', 2)
vec2Set('xy', 2)
vec2Set('yx', v2)


type Vec3Set = <T extends string>(
    selection: Set_XYZW_Selection_3D<T> | Set_RGBA_Selection_3D<T>,
    updater: number | VecN<Length<T>>
) => Vec3
declare const vec3Set: Vec3Set
declare const v3: Vec3
vec3Set('x', 2)
vec3Set('y', 2)
vec3Set('xy', 2)
vec3Set('yx', v2)
vec3Set('zx', v2)
vec3Set('zyx', v3)
vec3Set('yxz', 1)

vec3Set('xx', v2)

type Vec4Set = <T extends string>(
    selection: Set_XYZW_Selection_4D<T> | Set_RGBA_Selection_4D<T>,
    updater: number | VecN<Length<T>>
) => Vec4
declare const vec4Set: Vec4Set
declare const v4: Vec4
vec4Set('x', 2)
vec4Set('y', 2)
vec4Set('r', 7)
vec4Set('xy', 2)
vec4Set('yx', v2)
vec4Set('zx', v2)
vec4Set('zyx', v3)
vec4Set('yxz', 1)
vec4Set('rgba', v4)
vec4Set('arg', v3)

type Tests = [
    Expect<Equal<Set_XYZW_Selection_3D<'x'>, 'x'>>,
    Expect<Equal<Set_XYZW_Selection_3D<'y'>, 'y'>>,
    Expect<Equal<Set_XYZW_Selection_3D<'xy'>, 'xy'>>,
    Expect<Equal<Set_XYZW_Selection_3D<'xz'>, 'xz'>>,
    Expect<Equal<Set_XYZW_Selection_3D<'zyx'>, 'zyx'>>,

    Expect<Equal<Set_XYZW_Selection_3D<'xx'>, never>>,
    Expect<Not<Equal<Set_XYZW_Selection_3D<'xx'>, 'xx'>>>,

    Expect<Equal<Set_XYZW_Selection_3D<''>, never>>,
    Expect<Not<Equal<Set_XYZW_Selection_3D<''>, ''>>>,
]
