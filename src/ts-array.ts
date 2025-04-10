import { Equal, Expect, Not } from "./ts-debug"
import { Compare } from "./ts-number"

export type MaxArrayLength<T extends unknown[], Max extends number> =
    Compare<T['length'], Max> extends 'less' | 'equal' ? T : never

export type MinArrayLength<T extends unknown[], Min extends number> =
    Compare<T['length'], Min> extends 'greater' | 'equal' ? T : never

export type ArrayLengthInRange<T extends unknown[], Min extends number, Max extends number> =
    MinArrayLength<T, Min> & MaxArrayLength<T, Max>

type OnlyOfElements<T extends unknown[], Elements extends unknown[]> =
    T extends []
        ? unknown
        : T extends [Elements[number], ...infer Tail]
            ? OnlyOfElements<Tail, Elements>
            : never

export type ConsistsOnlyOfElements<T extends unknown[], Elements extends unknown[]> =
    T & OnlyOfElements<T, Elements>

type Tests = [
    Expect<Equal<ConsistsOnlyOfElements<[], []>, []>>,
    Expect<Equal<ConsistsOnlyOfElements<[], [0, 1, '2', true]>, []>>,
    Expect<Equal<ConsistsOnlyOfElements<[0], [0]>, [0]>>,

    Expect<Equal<ConsistsOnlyOfElements<[1, 1, 1, 1, 1], [0, 1, 2]>, [1, 1, 1, 1, 1]>>,

    Expect<Equal<ConsistsOnlyOfElements<[3], [0, 1, 2]>, never>>,
    Expect<Not<Equal<ConsistsOnlyOfElements<[3], [0, 1, 2]>, [3]>>>,
]
