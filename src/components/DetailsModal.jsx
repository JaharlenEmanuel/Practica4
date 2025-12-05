// components/DetailsModal.jsx
import React from 'react'

export default function DetailsModal({ isOpen, onClose, item }) {
    if (!isOpen || !item) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Poster */}
                            <div className="lg:w-1/3">
                                <img
                                    src={item.images["Poster Art"].url}
                                    alt={item.title}
                                    className="w-full rounded-lg shadow-lg"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = '/placeholder.png'
                                    }}
                                />
                            </div>

                            {/* Details */}
                            <div className="lg:w-2/3">
                                {/* Badge y año */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.programType === 'series'
                                            ? 'bg-blue-600'
                                            : 'bg-green-600'
                                        }`}>
                                        {item.programType === 'series' ? 'SERIES' : 'MOVIE'}
                                    </span>
                                    <span className="text-gray-300">
                                        {item.releaseYear || 'Release year not available'}
                                    </span>
                                </div>

                                {/* Descripción */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Información adicional */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-900 p-4 rounded-lg">
                                        <h4 className="text-gray-400 text-sm mb-1">Type</h4>
                                        <p className="text-white capitalize">{item.programType}</p>
                                    </div>
                                    <div className="bg-gray-900 p-4 rounded-lg">
                                        <h4 className="text-gray-400 text-sm mb-1">Release Year</h4>
                                        <p className="text-white">{item.releaseYear || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-900 p-4 rounded-lg">
                                        <h4 className="text-gray-400 text-sm mb-1">Image Resolution</h4>
                                        <p className="text-white">
                                            {item.images["Poster Art"].width} × {item.images["Poster Art"].height} px
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 p-4 rounded-lg">
                                        <h4 className="text-gray-400 text-sm mb-1">Status</h4>
                                        <p className="text-green-400">Available to stream</p>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                                        ▶ Play Now
                                    </button>
                                    <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                                        + Add to Watchlist
                                    </button>
                                    <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                                        ⭐ Rate
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Información técnica (opcional) */}
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <h4 className="text-gray-400 text-sm">Aspect Ratio</h4>
                                    <p className="text-white">16:9</p>
                                </div>
                                <div>
                                    <h4 className="text-gray-400 text-sm">Language</h4>
                                    <p className="text-white">English</p>
                                </div>
                                <div>
                                    <h4 className="text-gray-400 text-sm">Subtitles</h4>
                                    <p className="text-white">Multiple</p>
                                </div>
                                <div>
                                    <h4 className="text-gray-400 text-sm">Quality</h4>
                                    <p className="text-green-400">HD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}