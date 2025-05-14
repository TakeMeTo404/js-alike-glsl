import { describe, it, expect } from 'vitest'
import { vec2, vec3, vec4 } from './'

describe('vec', () => {
    it('create vector', () => {
        const x = Math.random()
        expect(vec2(x).values).toEqual([x, x])
        expect(vec3(x).values).toEqual([x, x, x])
        expect(vec4(x).values).toEqual([x, x, x, x])

        const y = Math.random()
        expect(vec2(x, y).values).toEqual([x, y])

        const z = Math.random()
        expect(vec3(x, y, z).values).toEqual([x, y, z])
        expect(vec3(vec2(x, y), z).values).toEqual([x, y, z])

        const w = Math.random()
        expect(vec4(x, y, z, w).values).toEqual([x, y, z, w])
        expect(vec4(vec3(z), w).values).toEqual([z, z, z, w])

        expect(vec2({ x, y }).values).toEqual([x, y])
        expect(vec3({ x, y, z }).values).toEqual([x, y, z])
        expect(vec4({ x, y, z, w }).values).toEqual([x, y, z, w])

        const [r, g, b, a] = [x, y, z, w]
        expect(vec2({ r, g }).values).toEqual([r, g])
        expect(vec3({ r, g, b }).values).toEqual([r, g, b])
        expect(vec4({ r, g, b, a }).values).toEqual([r, g, b, a])
    })

    it('index properties', () => {
        expect(vec2(7)).toHaveProperty([0], 7)
        expect(vec2(-11)).toHaveProperty([1], -11)
        expect(vec2(6)).not.toHaveProperty([2])
        expect(vec2(6)).not.toHaveProperty([3])

        expect(vec3(7)).toHaveProperty([0], 7)
        expect(vec3(-11)).toHaveProperty([1], -11)
        expect(vec3(6)).toHaveProperty([2], 6)
        expect(vec3(0)).not.toHaveProperty([3])

        expect(vec4(7)).toHaveProperty([0], 7)
        expect(vec4(-11)).toHaveProperty([1], -11)
        expect(vec4(6)).toHaveProperty([2], 6)
        expect(vec4(10)).toHaveProperty([3], 10)
    })

    it('get selection', () => {
        const [x, y, z, w] = [Math.random(), Math.random(),Math.random(), Math.random()]
        const [r, g, b, a] = [x, y, z, w]

        expect(vec2(x, y).get('x')).toBe(x)
        expect(vec2(x, y).get('y')).toBe(y)
        expect(vec2(x, y).get('z')).toBeUndefined()
        expect(vec2(x, y).get('r')).toBe(r)
        expect(vec2(x, y).get('g')).toBe(g)
        expect(vec2(x, y).get('b')).toBeUndefined()

        expect(vec3(x, y, z).get('x')).toBe(x)
        expect(vec3(x, y, z).get('y')).toBe(y)
        expect(vec3(x, y, z).get('z')).toBe(z)
        expect(vec3(x, y, z).get('w')).toBeUndefined()
        expect(vec3(x, y, z).get('r')).toBe(r)
        expect(vec3(x, y, z).get('g')).toBe(g)
        expect(vec3(x, y, z).get('b')).toBe(b)
        expect(vec3(x, y, z).get('a')).toBeUndefined()

        expect(vec4(x, y, z, w).get('x')).toBe(x)
        expect(vec4(x, y, z, w).get('y')).toBe(y)
        expect(vec4(x, y, z, w).get('z')).toBe(z)
        expect(vec4(x, y, z, w).get('w')).toBe(w)
        expect(vec4(x, y, z, w).get('r')).toBe(r)
        expect(vec4(x, y, z, w).get('g')).toBe(g)
        expect(vec4(x, y, z, w).get('b')).toBe(b)
        expect(vec4(x, y, z, w).get('a')).toBe(a)

        expect(vec2(x, y).get('yx').values).toEqual([y, x])
        expect(vec2(x, y).get('rg').values).toEqual([r, g])
        expect(vec2(x, y).get('ggg').values).toEqual([g, g, g])
        expect(vec2(x, y).get('xyyx').values).toEqual([x, y, y, x])

        expect(vec2(x, y).get('zz').values).toEqual([undefined, undefined])
        expect(vec2(x, y).get('ww').values).toEqual([undefined, undefined])

        expect(vec3(x, y, z).get('zz').values).toEqual([z, z])
        expect(vec3(x, y, z).get('ww').values).toEqual([undefined, undefined])

        expect(vec4(x, y, z, w).get('zz').values).toEqual([z, z])
        expect(vec4(x, y, z, w).get('ww').values).toEqual([w, w])
    })

    it('vec2.set(selection)', () => {
        const [x, y, z, w] = [Math.random(), Math.random(),Math.random(), Math.random()]
        const [r, g, b, a] = [x, y, z, w]

        const v2 = vec2(0)
        expect(v2.values).toEqual([0, 0])

        v2.set('x', x)
        expect(v2.values).toEqual([x, 0])

        v2.set('y', y)
        expect(v2.values).toEqual([x, y])

        v2.set('yx', vec2(z))
        expect(v2.values).toEqual([z, z])

        v2.set('yx', vec2(-5, 10))
        expect(v2.values).toEqual([10, -5])

        v2.set('gr', vec2(g, r))
        expect(v2.values).toEqual([r, g])
    })

    it('vec3.set(selection)', () => {
        const [x, y, z, w] = [Math.random(), Math.random(),Math.random(), Math.random()]
        const [r, g, b, a] = [x, y, z, w]

        const v3 = vec3(0)
        expect(v3.values).toEqual([0, 0, 0])

        v3.set('zx', vec2(z, x))
        expect(v3.values).toEqual([x, 0, z])

        v3.set('y', y)
        expect(v3.values).toEqual([x, y, z])

        v3.set('rgb', vec3(r, g, b))
        expect(v3.values).toEqual([r, g, b])
    })

    it('vec4.set(selection)', () => {
        const [x, y, z, w] = [Math.random(), Math.random(),Math.random(), Math.random()]
        const [r, g, b, a] = [x, y, z, w]

        const v4 = vec4(0)
        expect(v4.values).toEqual([0, 0, 0, 0])

        v4.set('wxy', vec3(w, x, y))
        expect(v4.values).toEqual([x, y, 0, w])

        v4.set('z', z)
        expect(v4.values).toEqual([x, y, z, w])

        v4.set('a', a)
        v4.set('rgb', vec3(0))
        expect(v4.values).toEqual([0, 0, 0, a])
        v4.set('brg', vec3(b, r, g))
        expect(v4.values).toEqual([r, g, b, a])
    })

    it('set mutates "values" array', () => {
        const [x, y, z, w] = [Math.random(), Math.random(),Math.random(), Math.random()]

        const v2 = vec2(x, y)
        const v2Values = v2.values

        expect(v2Values).toEqual([x, y])
        expect(v2.values).toEqual([x, y])

        v2.set('xy', vec2(z, w))
        expect(v2Values).toEqual([z, w])
        expect(v2.values).toEqual([z, w])
    })

    it('vec values are mutable', () => {
        const a = Math.random()
        const b = Math.random()

        const v = vec2(a, b)

        const c = Math.random()
        v.values[0] = c

        expect(v.get('x')).toBe(c)
        expect(v[0]).toBe(c)
        expect(v[1]).toBe(b)

        v.values = [a, c]

        expect(v.get('x')).toBe(a)
        expect(v[0]).toBe(a)
        expect(v[1]).toBe(c)
        expect(v.get('g')).toBe(c)
    })

    it('vec.copy() creates new array', () => {
        const [x1, y1, x2, y2] = [Math.random(), Math.random(),Math.random(), Math.random()]

        const v1 = vec2(x1, y1)
        const v2 = v1.copy()

        expect(v1.values).toEqual(v2.values)

        v2.values[0] = x2

        expect(v1.values).toEqual([x1, y1])
        expect(v2.values).toEqual([x2, y1])

        v2.values[1] = y2

        expect(v1.values).toEqual([x1, y1])
        expect(v2.values).toEqual([x2, y2])

        v1.values[0] = y1

        expect(v1.values).toEqual([y1, y1])
        expect(v2.values).toEqual([x2, y2])
    })

    it('callable vector operations', () => {
        expect(vec2(0)('+', 3).values).toEqual([3, 3])
        expect(vec2(11, 17)('-', 22).values).toEqual([-11, -5])

        expect(vec3(1, 1, 2)('*', vec3(2, -2, -2)).values).toEqual([2, -2, -4])
        expect(vec4(10)('/', 10)('+', vec4(5)).values).toEqual([6, 6, 6, 6])
    })

    it('callable vector assign operations', () => {
        const v2 = vec2(0)

        expect(v2('+=', 10)).toBeUndefined()
        expect(v2.values).toEqual([10, 10])

        v2('-=', vec2(5, 15))
        expect(v2.values).toEqual([5, -5])

        const v3 = vec3(12, 24, 0)
        v3('/=', 3)
        expect(v3.values).toEqual([4, 8, 0])

        const v4 = vec4(v3, 0)

        v4('*=', 5)
        expect(v4.values).toEqual([20, 40, 0, 0])
        v4('+=', -10)
        expect(v4.values).toEqual([10, 30, -10, -10])
    })
})
