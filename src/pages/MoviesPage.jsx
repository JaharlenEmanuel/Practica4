import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useFetch from '../hooks/useFetch'

export default function MoviesPage() {
    const navigate = useNavigate()
    const { data, loading, error } = useFetch('/sample.json')

    // Filtrar solo películas
    const movies = React.useMemo(() => {
        if (!data || !data.entries) return []

        return data.entries
            .filter(item => item.programType === 'movie')
            .sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0))
            .slice(0, 20)
    }, [data])

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-bold mb-8">Popular Movies</h1>

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
                ) : movies.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">No movies found</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-400 mb-6">
                            Showing {movies.length} movies
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {movies.map((movie) => (
                                <div
                                    key={movie.title}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
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
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                            {movie.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                            {movie.description}
                                        </p>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="px-2 py-1 bg-green-600 rounded">
                                                Movie
                                            </span>
                                            <span className="text-gray-400">
                                                {movie.releaseYear || 'Unknown year'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    )
}