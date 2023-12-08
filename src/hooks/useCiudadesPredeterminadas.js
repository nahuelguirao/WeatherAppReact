import { useState, useEffect } from "react";
import { fetchClima } from '../helpers/fetchClima';

export const useCiudadesPredeterminadas = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const ciudadesPrincipales = ['Londres', 'Nueva York', 'Sydney', 'Tokio']
            try {
                //Utilizo Promise.all para esperar que esten todos los fetch realizados
                const resultados = await Promise.all(
                    ciudadesPrincipales.map(async (ciudad) => {
                        return await fetchClima(ciudad)
                    }))
                //seteo la informacion en datos
                setDatos(resultados)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return { datos }
}
