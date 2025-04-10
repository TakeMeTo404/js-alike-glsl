import { Length } from '../utils/ts-string'
import { ArrayOfLength } from '../utils/ts-array'
import { AnyNumberZeroToN } from '../utils/ts-number'
import { Get_XYZW_Selection, Get_RGBA_Selection } from './get'
import { Set_XYZW_Selection, Set_RGBA_Selection } from './set'
import { operations } from '@const'
import { ConstructorArgs } from './constructor'

// examples:
// vec2(7, -7)['+'](3)   -->   vec2(10, -4)
// vec3(1)[-](vec3(8))   -->   vec3(-7, -7, -7)
// const color = vec3(255, 0, 0);  color['/='](2);  color.get('rgb')  -->   vec3(127.5, 0, 0)
type OperatorProperties<N extends 2 | 3 | 4> = {
    [_ in keyof typeof operations]: (other: number | VecN<N>) => VecN<N>
} & {
    [_ in keyof typeof operations as `${_}=`]: (other: number | VecN<N>) => void
}

type Vec<N extends 2 | 3 | 4> = {
    values: ArrayOfLength<number, N>

    copy: () => VecN<N>

    get: <T extends string>(
        selection: Get_XYZW_Selection<T, N> | Get_RGBA_Selection<T, N>
    ) => VecN<Length<T>>

    set: <T extends string>(
        selection: Get_XYZW_Selection<T, N> | Get_RGBA_Selection<T, N>,
        value: VecN<Length<T>>
    ) => VecN<N>

} & OperatorProperties<N> & Record<AnyNumberZeroToN<N>, number>

export type Vec2 = Vec<2>
export type Vec3 = Vec<3>
export type Vec4 = Vec<4>

type VecN<T extends number> =
    T extends 1 ? number :
    T extends 2 ? Vec2 :
    T extends 3 ? Vec3 :
    T extends 4 ? Vec4 :
    never
