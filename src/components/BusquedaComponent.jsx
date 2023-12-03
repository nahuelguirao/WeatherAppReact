import React, { useState } from 'react'
import { fetchClima } from '../helpers/fetchClima'
import { CiudadBuscadaCard } from './CiudadBuscadaCard'
import { motion } from 'framer-motion'
import '../styles/busquedaComponent.css'

export const BusquedaComponent = () => {
    //Ciudad que busca el usuario
    const [ciudad, setCiudad] = useState('')
    //Info que se trae de la API
    const [infoBuscada, setInfoBuscada] = useState(null)
    //Posibles errores para manejar el mensaje de error
    const [error, setError] = useState(false)
    //Envia el valor ingresado al hook de ciudad
    const cambioInput = (e) => { setCiudad(e.target.value) }
    //Ejecuta la función en caso de que se busque una ciudad
    const onBusqueda = (e) => {
        e.preventDefault()
        if (ciudad) llamadoApi()
    }
    //Si todo sale bien (es decir retorna datos) se setean con el hook de infoClima, sino se establece el hook de Error a true para mostrar un mensaje en la página + Error en consola
    const llamadoApi = async () => {
        const { datos, error } = await fetchClima(ciudad)
        if (datos) {
            setInfoBuscada(datos)
            setError(false)
        } else if (error) {
            console.error(error)
            setError(true)
            setInfoBuscada(null)
        }
    }
    return (
        <motion.div
            className="container"
            animate={{ x: [-500, -100, 0], opacity: [0.5, 0.75, 1] }}
        >
            <h1>Clima Actual</h1>
            <form onSubmit={onBusqueda}>
                <label htmlFor="ciudad">Ingrese una ciudad</label>
                <input type="text" placeholder='Ingrese una ciudad...' value={ciudad} onChange={cambioInput} id='ciudad' />
                <button type='submit'>Buscar</button>
            </form>
            <CiudadBuscadaCard infoBuscada={infoBuscada} error={error} />
        </motion.div>

    )
}
