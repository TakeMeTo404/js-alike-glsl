import type { Mat2, Mat3, Mat4, Mat2x3, Mat2x4, Mat3x2, Mat3x4, Mat4x2, Mat4x3, MatCreateArgs} from './types/mat'

export declare const mat2: (...args: MatCreateArgs<2>) => Mat2
export declare const mat3: (...args: MatCreateArgs<3>) => Mat3
export declare const mat4: (...args: MatCreateArgs<4>) => Mat4

export declare const mat2x3: (...args: MatCreateArgs<2, 3>) => Mat2x3
export declare const mat2x4: (...args: MatCreateArgs<2, 4>) => Mat2x4

export declare const mat3x2: (...args: MatCreateArgs<3, 2>) => Mat4x2
export declare const mat3x4: (...args: MatCreateArgs<3, 4>) => Mat3x4

export declare const mat4x2: (...args: MatCreateArgs<4, 2>) => Mat4x2
export declare const mat4x3: (...args: MatCreateArgs<4, 3>) => Mat4x3
