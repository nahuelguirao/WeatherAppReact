export const fetchClima = async(url,ciudad,apiKey) => {
    try {
        const respuesta = await fetch(`${url}?q=${ciudad}&appid=${apiKey}&lang=es`)
        const datos = await respuesta.json()
        if (respuesta.ok) {
            return{datos, error:null}
        } else {
            return{datos:null, error:datos.message}
        }
    } catch (error) {
        return{datos:null, error}
    }
}
