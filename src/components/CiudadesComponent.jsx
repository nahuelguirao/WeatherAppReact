import React, { useEffect, useState } from 'react';
import '../styles/ciudadesComponent.css'
import '../styles/animacionCarga.css'
import { fetchClima } from '../helpers/fetchClima';

export const CiudadesComponent = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const ciudadesPrincipales = ['Londres', 'Nueva York', 'Sydney', 'Tokio']
            try {
                const resultados = await Promise.all(
                    ciudadesPrincipales.map(async (ciudad) => {
                        return await fetchClima(ciudad)
                    }))
                setDatos(resultados)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    if (datos.length === 0) return (
        <div id="contenedor">
            <div class="contenedor-loader">
                <div class="rueda"></div>
            </div>
            <div class="cargando">Cargando...</div>
        </div>
    )

    return (
        <div className='containerSecundario'>
            <div className='climaEnVivo fadeIn'>
                <h2>Clima en vivo</h2>
                <img src='/iconoVivo.png'></img>
            </div>
            <div className='cardCiudadesContainer fadeIn'>
                {datos.map((ciudad, index) => {
                    return (
                        <div className='cardCiudades' id='cardEstirable' key={index}>
                            <div className="infoPrincipal">
                                <h2 id='tituloCard'>{ciudad.datos.name}</h2>
                                <p id='temperatura'>{ciudad.datos.main.temp}°C</p>
                            </div>
                            <div className='situacionActual'>
                                <img src={`https://openweathermap.org/img/w/${ciudad.datos.weather[0].icon}.png`} alt='Weather icon' />
                                <p className='parrafoSecundario'>{ciudad.datos.weather[0].description}</p>
                            </div>
                            <div className='dataExtra'>
                                <p className='parrafoTerciario'>Humedad {ciudad.datos.main.humidity}%</p>
                                <p className="parrafoTerciario">Mínima {ciudad.datos.main.temp_min}°C</p>
                                <p className="parrafoTerciario">Máxima {ciudad.datos.main.temp_max}°C</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
