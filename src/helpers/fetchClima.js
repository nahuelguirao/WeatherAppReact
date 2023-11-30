export const fetchClima = async (ciudad) => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f16b764b60a87307ba4f1ef73866b28d'

    try {
        const respuesta = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}&lang=es`)
        const datos = await respuesta.json()
        if (respuesta.ok) {
            return { datos, error: null }
        } else {
            return { datos: null, error: datos.message }
        }
    } catch (error) {
        return { datos: null, error }
    }
}
