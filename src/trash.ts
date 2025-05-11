/*constructorArgsNOld: <N extends 2 | 3 | 4> (v: unknown, n: N): v is XYZW_ContructorArgs<N> => {
    if (!v || typeof v !== 'object') {
        return false
    }
    if (Object.keys(v).length !== n) {
        return false
    }

    for (let i = 0; i < n; i++) {
        const at = xyzw[i] as string
        if (!(at in v) ||
            typeof (v as { [at]: any })[at] !== 'number'
        ) {
            return false
        }
    }

    return true
},*/

/*const create = {
    fromSingleValue: <N extends 2 | 3 | 4>(n: N) => (v: number): ArrayOfLength<number, N> => {
        return [...new Array(n)].map(() => v) as ArrayOfLength<typeof v, N>
    },


}

const vecN = <N extends 2 | 3 | 4>(n: N) => (...args: ConstructorArgs<N>): VecN<N> => {
    let values: ArrayOfLength<number, typeof n>

    if (isNumberArrayOfLength(args, 1)) {
        values = repeat(n, args[0])
    } else if (args.length === n && isNumberArrayOfLength(args, n)) {
        values = [...args]
    } else if (args.length === 1 && is.xyzw.constructorArgs.vecN(n)(args[0])) {
        values = xyzw
            .slice(0, n)
            .map(at => (args[0] as { [at]: number })[at]
            ) as ArrayOfLength<number, N>
    } else if (args.length === 1 && is.rgba.constructorArgs.vecN(n)(args[0])) {
        values = rgba
            .slice(0, n)
            .map(at => (args[0] as { [at]: number })[at]
            ) as ArrayOfLength<number, N>
    } else if (
        n === 3 && args.length === 2 && typeof args[0] === 'number' && is.vec2(args[1])
    ) {
        values = [args[0], ...args[1].values] as ArrayOfLength<number, N>
    } else {
        throw new TypeError()
    }

    const aa = values

    return {
        values,
    }
    }*/

    // линейная интерполяция между цветами
    // requestAnimationFrame(function loop() {

    //     const seconds = Date.now() / 1000

    //     let t = Math.sin(seconds)
    //     t = (t + 1) / 2
    //     // now t between 0 and 1

    //     const fromRedToGreen = mix(red, green, vec3(t))

    //     someDiv.style.backgroundColor = toCssColor(fromRedToGreen)

    //     requestAnimationFrame(loop)
    // })
    // declare const someDiv: HTMLDivElement
    // declare const toCssColor: (vec3: Vec3) => string

    // M на N, где M – количество строк, N – количество столбцов
    // mat3x3.set(0, vec3(7))
    // mat3x3.set([0, 1], [vec3(7), vec3(-7)]) // set 1 column to sevens, second column to minus-sevens
    // mat3x3.set([0, 1], someMat2x3)
    // mat3x3.set(0, vec3(7))
    // mat3x3.set(0, vec3(7))
    // mat3x3.set(0, vec3(7))
    // mat3x3.set(0, vec3(7))
