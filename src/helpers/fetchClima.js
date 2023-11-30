export const fetchClima = async (ciudad) => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f16b764b60a87307ba4f1ef73866b28d'

    try {
        const respuesta = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}&lang=es`)
        const { ok } = respuesta
        const datos = await respuesta.json()
        //Si esta todo ok convierte los datos directamente a celsius y envia toda la data 
        if (ok) {
            if (datos) {
                datos.main.temp = Math.round(datos.main.temp - 273.15)
                datos.main.temp_min = Math.round(datos.main.temp_min - 273.15)
                datos.main.temp_max = Math.round(datos.main.temp_max - 273.15)
            }
            return { datos, error: null }
        } else {
            return { datos: null, error: datos.message }
        }
    } catch (error) {
        return { datos: null, error }
    }
}
