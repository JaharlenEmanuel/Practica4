// hooks/useFetch.js
import { useState, useEffect } from 'react'

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Bandera para evitar actualizar estado si el componente se desmonta
        let isMounted = true

        const fetchData = async () => {
            try {
                if (isMounted) {
                    setLoading(true)
                    setError(null)
                }

                const response = await fetch(url, options)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const jsonData = await response.json()

                if (isMounted) {
                    setData(jsonData)
                    setLoading(false)
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error fetching data:', err)
                    setError(err.message || 'Something went wrong')
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [url, options])

    return {
        data,
        loading,
        error,
        refetch: () => {
            setLoading(true)
            setError(null)
            fetch(url, options)
                .then(response => response.json())
                .then(jsonData => setData(jsonData))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false))
        }
    }
}

export default useFetch