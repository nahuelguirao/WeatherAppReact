import React from 'react'
import { BusquedaComponent } from './components/BusquedaComponent'
import { CiudadesComponent } from './components/CiudadesComponent'
import './styles/animaciones.css'

export const AppClima = () => {
    return (
        <>
            <BusquedaComponent />
            <CiudadesComponent />
        </>
    )
}
