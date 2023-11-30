export const fetchCiudades = async (ciudades) => {
    let resultados = []

    for (const ciudad of ciudades) {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=f16b764b60a87307ba4f1ef73866b28d&lang=es`)
        const resultadoFinal = await respuesta.json()
        resultados.push(resultadoFinal)
    }

    return resultados
}
