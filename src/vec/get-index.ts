import { ArrayLengthInRange, ConsistsOnlyOfElements } from "../ts-array"

type IndexSelection<T extends number[], AllowedIndexes extends number[], MinLength extends number, MaxLength extends number> =
    T extends ArrayLengthInRange<T, MinLength, MaxLength>
        ? T extends ConsistsOnlyOfElements<T, AllowedIndexes>
            ? T
            : never
        : never


type Get_Index_Selection_2D<T extends number[]> = IndexSelection<T, [0, 1], 1, 4>
type Get_Index_Selection_3D<T extends number[]> = IndexSelection<T, [0, 1, 2], 1, 4>
type Get_Index_Selection_4D<T extends number[]> = IndexSelection<T, [0, 1, 2, 3], 1, 4>

// declare const foo: <i extends number, T extends i[]>(selection: Get_Index_Selection_3D<[...T]>) => void
declare const foo: <i extends number, T extends i[]>(selection: Get_Index_Selection_3D<NoInfer<[...T]>>) => void
declare const foo2: <i extends number, T extends i[]>(selection: [...T]) => T
declare const foo3: <i extends number, T extends i[] & Get_Index_Selection_2D<i[]>>(selection: [...T]) => T

foo([1, 0])
const cc = foo2([1, 0])
foo3([1, 0])


// type SomeType<T extends number[]> = T extends [1, 2] ? 'yes' : 'no'
type SomeType<T extends number[]> = T extends { 0: 1; 1: 2; length: 2 } ? 'yes' : 'no'


declare const func: <T extends number[]>(arg: T) => SomeType<T>

const result1: 'yes' = func([1, 2] as const)
const result2: 'yes' = func([1, 2]) // error


declare function tuplify<
    Elem extends string | number,
    Tuple extends Elem[]
>(ary: [...Tuple]): Tuple

const ff = tuplify([1, 2, 3])
