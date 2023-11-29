import React, { useState } from 'react'
import { fetchClima } from '../helpers/fetchClima'
import imagenError from '../assets/iconoError.png'

export const BusquedaComponent = () => {
    //Parametros para usar fetchClima
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f16b764b60a87307ba4f1ef73866b28d'

    const [ciudad, setCiudad] = useState('')
    const [infoClima, setInfoClima] = useState(null)
    const [error, setError] = useState(false)

    const cambioInput = (e) => { setCiudad(e.target.value) }

    //Ejecuta la función en caso de que se busque una ciudad
    const onBusqueda = (e) => {
        e.preventDefault()
        if (ciudad) fetchInfoClima()
    }

    //Si todo sale bien (es decir retorna datos) se setean con el hook de infoClima, sino se establece el hook de Error a true para mostrar un mensaje en la página + Error en consola
    const fetchInfoClima = async () => {
        const { datos, error } = await fetchClima(urlBase, ciudad, apiKey)
        if (datos) {
            setInfoClima(datos)
            setError(false)
            console.log(datos)
        } else if (error) {
            console.error(error)
            setError(true)
            setInfoClima(null)
        }
    }

    return (
        <div className="container">
            <h1>Clima Actual</h1>
            <form onSubmit={onBusqueda}>
                <label htmlFor="ciudad">Ingrese una ciudad</label>
                <input type="text" placeholder='Ingrese una ciudad...' value={ciudad} onChange={cambioInput} id='ciudad' />
                <button type='submit'>Buscar</button>
            </form>
            {/*Si hay información */}
            {infoClima && (
                <div className='card'>
                    <div className="infoPrincipal">
                        <h2 id='tituloCard'>{infoClima.name}</h2>
                        <p id='temperatura'>{parseInt(infoClima.main.temp - 273.15)}°C</p>
                    </div>
                    <div className='situacionActual'>
                        <img src={`https://openweathermap.org/img/w/${infoClima.weather[0].icon}.png`} alt='Weather icon' />
                        <p className='parrafoSecundario'>{infoClima.weather[0].description}</p>
                    </div>
                    <div className='dataExtra'>
                        <p className='parrafoTerciario'>Humedad {infoClima.main.humidity}%</p>
                        <p className="parrafoTerciario">Mínima {parseInt(infoClima.main.temp_min - 273.15)}°C</p>
                        <p className="parrafoTerciario">Máxima {parseInt(infoClima.main.temp_max - 273.15)}°C</p>
                    </div>
                </div>)}
            {/*Si hay un Error*/}
            {error && (
                <div>
                    <p className='parrafoError'>Algo salió mal! Intenta nuevamente.</p>
                    <img src={imagenError} alt="Icono error" className='imgError' />
                </div>)}
        </div>
    )
}
