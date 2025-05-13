import { rgba, xyzw } from "../../const";
import { ConsistsOfUniqueChars, ConsistsOnlyOfChars, LengthInRange } from "../utils/ts-string";
import { AnyNumberZeroToN } from "../utils/ts-number";
import { Equal, Expect, Not } from "../utils/ts-debug";

type SetSelection<T extends string, Coordinates extends string, MinLength extends number, MaxLength extends number> =
    T extends LengthInRange<T, MinLength, MaxLength>
        ? T extends ConsistsOnlyOfChars<T, Coordinates>
            ? T extends ConsistsOfUniqueChars<T>
                ? T
                : never
            : never
        : never

export type Set_XYZW_Selection<T extends string, N extends 2 | 3 | 4> =
    N extends 2 ? SetSelection<T, typeof xyzw[AnyNumberZeroToN<2>], 1, 4> :
    N extends 3 ? SetSelection<T, typeof xyzw[AnyNumberZeroToN<3>], 1, 4> :
    N extends 4 ? SetSelection<T, typeof xyzw[AnyNumberZeroToN<4>], 1, 4> :
        never

export type Set_RGBA_Selection<T extends string, N extends 2 | 3 | 4> =
    N extends 2 ? SetSelection<T, typeof rgba[AnyNumberZeroToN<2>], 1, 4> :
    N extends 3 ? SetSelection<T, typeof rgba[AnyNumberZeroToN<3>], 1, 4> :
    N extends 4 ? SetSelection<T, typeof rgba[AnyNumberZeroToN<4>], 1, 4> :
        never

// vec2(0).set('x', 2)
// vec2(0).set('y', 2)
// vec2(0).set('yx', vec2(1))

// vec3(0).set('x', 2)
// vec3(0).set('y', 2)
// vec3(0).set('xy', vec2(-1))
// vec3(0).set('yx', vec2(0))
// vec3(0).set('zx', vec2(0))
// vec3(0).set('zyx', vec3(0))
// vec3(0).set('yxz', vec3(-1))

type Tests = [
    Expect<Equal<Set_XYZW_Selection<'x', 3>, 'x'>>,
    Expect<Equal<Set_XYZW_Selection<'y', 3>, 'y'>>,
    Expect<Equal<Set_XYZW_Selection<'xy', 3>, 'xy'>>,
    Expect<Equal<Set_XYZW_Selection<'xz', 3>, 'xz'>>,
    Expect<Equal<Set_XYZW_Selection<'zyx', 3>, 'zyx'>>,

    Expect<Equal<Set_XYZW_Selection<'xx', 3>, never>>,
    Expect<Not<Equal<Set_XYZW_Selection<'xx', 3>, 'xx'>>>,

    Expect<Equal<Set_XYZW_Selection<'', 3>, never>>,
    Expect<Not<Equal<Set_XYZW_Selection<'', 3>, ''>>>,
]
