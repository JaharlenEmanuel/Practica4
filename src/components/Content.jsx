import React from 'react'
import { useNavigate } from 'react-router-dom'
// O si prefieres Link:
import { Link } from 'react-router-dom'

export default function Content() {
    const navigate = useNavigate()

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Popular Titles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                {/* Serie con onClick */}
                <div
                    className="cursor-pointer group"
                    onClick={() => navigate('/series')}
                >
                    <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-black bg-[url(/placeholder.png)] bg-center w-full h-64 bg-cover flex justify-center items-center">
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/70 group-hover:bg-black/30 transition-all duration-300"></div>
                        <span className="text-white font-bold text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                            Series
                        </span>
                    </div>
                    <button className="mt-4 w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-300">
                        Popular Series
                    </button>
                </div>

                {/* Película con Link */}
                <Link to="/movies" className="block no-underline">
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-black bg-[url(/placeholder.png)] bg-center w-full h-64 bg-cover flex justify-center items-center">
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/70 hover:bg-black/30 transition-all duration-300"></div>
                        <span className="text-white font-bold text-6xl relative z-10 hover:scale-110 transition-transform duration-300">
                            Movies
                        </span>
                    </div>
                    <button className="mt-4 w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-300">
                        Popular Movies
                    </button>
                </Link>

            </div>
        </main>
    )
}