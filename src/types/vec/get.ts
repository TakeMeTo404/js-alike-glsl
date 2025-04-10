import { rgba, xyzw } from "@const";
import { ConsistsOnlyOfChars, LengthInRange } from "../utils/ts-string";
import { AnyNumberZeroToN } from "../utils/ts-number";
import { Equal, Expect } from "../utils/ts-debug";
import { Vec2, Vec3, Vec4 } from ".";

type GetSelection<T extends string, Coordinates extends string, MinLength extends number, MaxLength extends number> =
    T extends LengthInRange<T, MinLength, MaxLength>
        ? T extends ConsistsOnlyOfChars<T, Coordinates>
            ? T
            : never
        : never

export type Get_XYZW_Selection<T extends string, N extends 2 | 3 | 4> =
    N extends 2 ? GetSelection<T, typeof xyzw[AnyNumberZeroToN<2>], 1, 4> :
    N extends 3 ? GetSelection<T, typeof xyzw[AnyNumberZeroToN<3>], 1, 4> :
    N extends 4 ? GetSelection<T, typeof xyzw[AnyNumberZeroToN<4>], 1, 4> :
    never

export type Get_RGBA_Selection<T extends string, N extends 2 | 3 | 4> =
    N extends 2 ? GetSelection<T, typeof rgba[AnyNumberZeroToN<2>], 1, 4> :
    N extends 3 ? GetSelection<T, typeof rgba[AnyNumberZeroToN<3>], 1, 4> :
    N extends 4 ? GetSelection<T, typeof rgba[AnyNumberZeroToN<4>], 1, 4> :
    never

const res1_2 = vec2(0).get('x'); type Res1_2 = Expect<Equal<typeof res1_2, number>>;
const res2_2 = vec2(0).get('yy'); type Res2_2 = Expect<Equal<typeof res2_2, Vec2>>;
const res3_2 = vec2(0).get('xyyx'); type Res3_2 = Expect<Equal<typeof res3_2, Vec4>>;
const res4_2 = vec2(0).get('r'); type Res4_2 = Expect<Equal<typeof res4_2, number>>;
const res5_2 = vec2(0).get('g'); type Res5_2 = Expect<Equal<typeof res5_2, number>>;
const res6_2 = vec2(0).get('rgg'); type Res6_2 = Expect<Equal<typeof res6_2, Vec3>>;
const res7_2 = vec2(0).get('grgr'); type Res7_2 = Expect<Equal<typeof res7_2, Vec4>>;

const res1_3 = vec3(0).get('z'); type Res1_3 = Expect<Equal<typeof res1_3, number>>;
const res2_3 = vec3(0).get('yy'); type Res2_3 = Expect<Equal<typeof res2_3, Vec2>>;
const res3_3 = vec3(0).get('xyyx'); type Res3_3 = Expect<Equal<typeof res3_3, Vec4>>;
const res4_3 = vec3(0).get('zzzz'); type Res4_3 = Expect<Equal<typeof res4_3, Vec4>>;
const res5_3 = vec3(0).get('g'); type Res5_3 = Expect<Equal<typeof res5_3, number>>;
const res6_3 = vec3(0).get('rgg'); type Res6_3 = Expect<Equal<typeof res6_3, Vec3>>;
const res7_3 = vec3(0).get('grgr'); type Res7_3 = Expect<Equal<typeof res7_3, Vec4>>;
const res8_3 = vec3(0).get('rgb'); type Res8_3 = Expect<Equal<typeof res8_3, Vec3>>;
const res9_3 = vec3(0).get('brgb'); type Res9_3 = Expect<Equal<typeof res9_3, Vec4>>;
