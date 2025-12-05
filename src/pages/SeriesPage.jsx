import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DetailsModal from '../components/DetailsModal'

export default function SeriesPage() {
    const navigate = useNavigate()
    const [allSeries, setAllSeries] = useState([])
    const [currentSeries, setCurrentSeries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Estado para paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    // Estado para el modal
    const [selectedItem, setSelectedItem] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                setLoading(true)
                const response = await fetch('/sample.json')

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()

                // Filtrar solo series
                const seriesData = data.entries.filter(
                    item => item.programType === 'series'
                )

                // Ordenar por año de lanzamiento (más reciente primero)
                const sortedSeries = seriesData.sort((a, b) =>
                    (b.releaseYear || 0) - (a.releaseYear || 0)
                )

                setAllSeries(sortedSeries)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching series:', err)
                setError(err.message || 'Failed to fetch series')
                setLoading(false)
            }
        }

        fetchSeries()
    }, [])

    // Calcular series para la página actual
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        setCurrentSeries(allSeries.slice(indexOfFirstItem, indexOfLastItem))
    }, [allSeries, currentPage, itemsPerPage])

    // Calcular número total de páginas
    const totalPages = Math.ceil(allSeries.length / itemsPerPage)

    // Cambiar de página
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0)
    }

    // Abrir modal con los detalles de la serie
    const handleItemClick = (serie) => {
        setSelectedItem(serie)
        setIsModalOpen(true)
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden'
    }

    // Cerrar modal
    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
        // Restaurar scroll
        document.body.style.overflow = 'unset'
    }

    // Botones de paginación
    const renderPagination = () => {
        const pageNumbers = []
        const maxPagesToShow = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-8">
                {/* Botón Anterior */}
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                >
                    ← Previous
                </button>

                {/* Primera página */}
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => goToPage(1)}
                            className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="text-gray-500">...</span>}
                    </>
                )}

                {/* Números de página */}
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => goToPage(number)}
                        className={`px-3 py-2 rounded-lg ${currentPage === number
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                    >
                        {number}
                    </button>
                ))}

                {/* Última página */}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
                        <button
                            onClick={() => goToPage(totalPages)}
                            className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Botón Siguiente */}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                >
                    Next →
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
                >
                    ← Back to Home
                </button>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Popular Series</h1>
                    {!loading && !error && (
                        <div className="text-gray-400">
                            Page {currentPage} of {totalPages} •
                            Showing {currentSeries.length} of {allSeries.length} series
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-400">Loading series...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/20 border border-red-700 rounded-lg p-8 text-center">
                        <p className="text-xl text-red-400">Error: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : allSeries.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">No series found</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentSeries.map((serie) => (
                                <div
                                    key={serie.title}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    onClick={() => handleItemClick(serie)}
                                >
                                    <div className="relative overflow-hidden h-64">
                                        <img
                                            src={serie.images["Poster Art"].url}
                                            alt={serie.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = '/placeholder.png'
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                                            {serie.releaseYear || 'N/A'}
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                                            <h3 className="font-semibold text-lg text-white">
                                                {serie.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm">Click for details →</p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                            {serie.title}
                                        </h3>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="px-2 py-1 bg-blue-600 rounded">
                                                Series
                                            </span>
                                            <span className="text-gray-400">
                                                {serie.releaseYear || 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && renderPagination()}
                    </>
                )}
            </main>
            <Footer />

            {/* Modal de detalles */}
            <DetailsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                item={selectedItem}
            />
        </div>
    )
}