import { Equal, Expect } from "../ts-debug"
import { ConsistsOnlyOfChars, Length, LengthInRange } from "../ts-string"
import { Vec2, Vec3, Vec4, VecN, Vector } from "./core"

export type GetSelection<T extends string, Coordinates extends string, MinLength extends number, MaxLength extends number> =
    T extends LengthInRange<T, MinLength, MaxLength>
        ? T extends ConsistsOnlyOfChars<T, Coordinates>
            ? T
            : never
        : never

type Get_XYZW_Selection_2D<T extends string> = GetSelection<T, 'x' | 'y', 1, 4>
type Get_XYZW_Selection_3D<T extends string> = GetSelection<T, 'x' | 'y' | 'z', 1, 4>
type Get_XYZW_Selection_4D<T extends string> = GetSelection<T, 'x' | 'y' | 'z' | 'w', 1, 4>

type Get_RGBA_Selection_2D<T extends string> = GetSelection<T, 'r' | 'g', 1, 4>
type Get_RGBA_Selection_3D<T extends string> = GetSelection<T, 'r' | 'g' | 'b', 1, 4>
type Get_RGBA_Selection_4D<T extends string> = GetSelection<T, 'r' | 'g' | 'b' | 'a', 1, 4>

type Vec2Get = <T extends string>(selection: Get_XYZW_Selection_2D<T> | Get_RGBA_Selection_2D<T>) => VecN<Length<T>>
declare const vec2_get: Vec2Get
const res1_2 = vec2_get('x'); type Res1_2 = Expect<Equal<typeof res1_2, number>>;
const res2_2 = vec2_get('yy'); type Res2_2 = Expect<Equal<typeof res2_2, Vec2>>;
const res3_2 = vec2_get('xyyx'); type Res3_2 = Expect<Equal<typeof res3_2, Vec4>>;
const res4_2 = vec2_get('r'); type Res4_2 = Expect<Equal<typeof res4_2, number>>;
const res5_2 = vec2_get('g'); type Res5_2 = Expect<Equal<typeof res5_2, number>>;
const res6_2 = vec2_get('rgg'); type Res6_2 = Expect<Equal<typeof res6_2, Vec3>>;
const res7_2 = vec2_get('grgr'); type Res7_2 = Expect<Equal<typeof res7_2, Vec4>>;

type Vec3Get = <T extends string>(selection: Get_XYZW_Selection_3D<T> | Get_RGBA_Selection_3D<T>) => VecN<Length<T>>
declare const vec3_get: Vec3Get
const res1_3 = vec3_get('z'); type Res1_3 = Expect<Equal<typeof res1_3, number>>;
const res2_3 = vec3_get('yy'); type Res2_3 = Expect<Equal<typeof res2_3, Vec2>>;
const res3_3 = vec3_get('xyyx'); type Res3_3 = Expect<Equal<typeof res3_3, Vec4>>;
const res4_3 = vec3_get('zzzz'); type Res4_3 = Expect<Equal<typeof res4_3, Vec4>>;
const res5_3 = vec3_get('g'); type Res5_3 = Expect<Equal<typeof res5_3, number>>;
const res6_3 = vec3_get('rgg'); type Res6_3 = Expect<Equal<typeof res6_3, Vec3>>;
const res7_3 = vec3_get('grgr'); type Res7_3 = Expect<Equal<typeof res7_3, Vec4>>;
const res8_3 = vec3_get('rgb'); type Res8_3 = Expect<Equal<typeof res8_3, Vec3>>;
const res9_3 = vec3_get('brgb'); type Res9_3 = Expect<Equal<typeof res9_3, Vec4>>;

const result = vec3_get('rr')

type XX = {
    foo: <T extends string>(arg: T) => Array<T>
}

type YY = {
    [T in string]: Array<T>
}

// M на N, где M – количество строк, N – количество столбцов

// mat3x3.set(0, vec3(7))
// mat3x3.set([0, 1], [vec3(7), vec3(-7)]) // set 1 column to sevens, second column to minus-sevens
// mat3x3.set([0, 1], someMat2x3)
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
// mat3x3.set(0, vec3(7))
