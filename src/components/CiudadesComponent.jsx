import React, { useEffect, useState } from 'react';
import '../styles/stylesCiudades.css';
import { fetchCiudades } from '../helpers/fetchCiudades';

export const CiudadesComponent = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultado = await fetchCiudades(['Tokyo', 'São Paulo', 'Ciudad de México', 'Nueva York', 'El Cairo']);
                setDatos(resultado)
            } catch (error) {
                console.error(error)
            }

        }
        fetchData()
    }, [])

    if (datos.length === 0) return 'Cargando...'

    return (
        <>
            <div className='parrafoVivo fadeIn'>
                <h2>Clima actual en vivo</h2>
                <img src='/iconoVivo.png'></img>
            </div>
            <div className='cardCiudadesContainer fadeIn'>
                {datos.map((ciudad, index) => {
                    return (
                        <div className='cardCiudades ' key={index}>
                            <div className="infoPrincipal">
                                <h2 id='tituloCard'>{ciudad.name}</h2>
                                <p id='temperatura'>{parseInt(ciudad.main.temp - 273.15)}°C</p>
                            </div>
                            <div className='situacionActual'>
                                <img src={`https://openweathermap.org/img/w/${ciudad.weather[0].icon}.png`} alt='Weather icon' />
                                <p className='parrafoSecundario'>{ciudad.weather[0].description}</p>
                            </div>
                            <div className='dataExtra'>
                                <p className='parrafoTerciario'>Humedad {ciudad.main.humidity}%</p>
                                <p className="parrafoTerciario">Mínima {parseInt(ciudad.main.temp_min - 273.15)}°C</p>
                                <p className="parrafoTerciario">Máxima {parseInt(ciudad.main.temp_max - 273.15)}°C</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
