import React from 'react'
import { motion } from 'framer-motion'
import { useBuscarCiudad } from '../hooks/useBuscarCiudad'
import { CiudadBuscadaCard } from './CiudadBuscadaCard'
import '../styles/busquedaComponent.css'

export const BusquedaComponent = () => {
    const { ciudad, cambioInput, onBusqueda, infoBuscada, error } = useBuscarCiudad()

    return (
        // Busqueda del container para buscar la ciudad 
        <motion.div
            className="container"
            animate={{ x: [-500, -100, 0], opacity: [0.5, 0.75, 1] }}
        >
            <h1>Clima Actual</h1>
            <form onSubmit={onBusqueda}>
                <label htmlFor="ciudad">Ingrese una ciudad</label>
                <input
                    type="text"
                    placeholder='Ingrese una ciudad...'
                    value={ciudad}
                    onChange={cambioInput}
                    id='ciudad'
                />
                <button type='submit'>Buscar</button>
            </form>
            <CiudadBuscadaCard infoBuscada={infoBuscada} error={error} />
        </motion.div>

    )
}
