import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DetailsModal from '../components/DetailsModal'
import useFetch from '../hooks/useFetch'

export default function MoviesPage() {
    const navigate = useNavigate()
    const [allMovies, setAllMovies] = useState([])
    const [currentMovies, setCurrentMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Estado para paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    // Estado para el modal
    const [selectedItem, setSelectedItem] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const response = await fetch('/sample.json')

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()

                // Filtrar solo Movies
                const moviesData = data.entries.filter(
                    item => item.programType === 'movie'
                )

                // Ordenar por año de lanzamiento (más reciente primero)
                const sortedMovies = moviesData.sort((a, b) =>
                    (b.releaseYear || 0) - (a.releaseYear || 0)
                )

                setAllMovies(sortedMovies)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching Movies:', err)
                setError(err.message || 'Failed to fetch Movies')
                setLoading(false)
            }
        }

        fetchMovies()
    }, [])

    // Calcular movies para la página actual
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        setCurrentMovies(allMovies.slice(indexOfFirstItem, indexOfLastItem))
    }, [allMovies, currentPage, itemsPerPage])

    // Calcular número total de páginas
    const totalPages = Math.ceil(allMovies.length / itemsPerPage)

    // Cambiar de página
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0)
    }

    // Abrir modal con los detalles de la movie
    const handleItemClick = (movie) => {
        setSelectedItem(movie)
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
                {/* Información de página */}
                <div className="text-gray-400 text-sm  px-4 py-2 rounded-lg">
                    Page {currentPage} of {totalPages} •
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, allMovies.length)} of{' '}
                    {allMovies.length} movies
                </div>

                {/* Controles de paginación */}
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {/* Botón Primera Página */}
                    <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg text-sm ${currentPage === 1
                            ? ' text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                    >
                        « First
                    </button>

                    {/* Botón Anterior */}
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg ${currentPage === 1
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                    >
                        ← Prev
                    </button>

                    {/* Indicador si hay páginas anteriores */}
                    {startPage > 1 && (
                        <span className="text-gray-500 px-2">...</span>
                    )}

                    {/* Números de página */}
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => goToPage(number)}
                            className={`px-3 py-2 min-w-10 rounded-lg ${currentPage === number
                                ? 'bg-green-600 text-white font-bold'
                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                        >
                            {number}
                        </button>
                    ))}

                    {/* Indicador si hay páginas siguientes */}
                    {endPage < totalPages && (
                        <span className="text-gray-500 px-2">...</span>
                    )}

                    {/* Botón Siguiente */}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg ${currentPage === totalPages
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                    >
                        Next →
                    </button>

                    {/* Botón Última Página */}
                    <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg text-sm ${currentPage === totalPages
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                    >
                        Last »
                    </button>
                </div>

                {/* Selector de página */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Go to:</span>
                    <select
                        value={currentPage}
                        onChange={(e) => goToPage(Number(e.target.value))}
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                    >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <option key={page} value={page}>
                                Page {page}
                            </option>
                        ))}
                    </select>
                </div>
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

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold">Popular Movies</h1>
                        {!loading && !error && (
                            <p className="text-gray-400 mt-2">
                                {allMovies.length} movies • {totalPages} pages
                            </p>
                        )}
                    </div>

                    {!loading && !error && (
                        <div className="flex items-center gap-4">
                            <div className="text-gray-400 text-sm bg-gray-800 px-4 py-2 rounded-lg">
                                {itemsPerPage} per page
                            </div>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-400">Loading movies...</p>
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
                ) : allMovies.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">No movies found</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {currentMovies.map((movie) => (
                                <div
                                    key={movie.title}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    onClick={() => handleItemClick(movie)}
                                >
                                    <div className="relative overflow-hidden h-64">
                                        <img
                                            src={movie.images["Poster Art"].url}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = '/placeholder.png'
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                                            {movie.releaseYear || 'N/A'}
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-green-600 px-2 py-1 rounded text-xs font-bold">
                                            MOVIE
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                                            <p className="text-gray-300 text-sm">Click for details →</p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                            {movie.title}
                                        </h3>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">
                                                {movie.releaseYear || 'Unknown'}
                                            </span>
                                            <span className="px-2 py-1 bg-green-600 rounded">
                                                Movie
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && renderPagination()}

                        {/* Información del grid */}
                        {!loading && !error && (
                            <div className="mt-6 text-center text-gray-400 text-sm">
                                Grid: {currentMovies.length} movies displayed •
                                Page {currentPage} of {totalPages}
                            </div>
                        )}
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