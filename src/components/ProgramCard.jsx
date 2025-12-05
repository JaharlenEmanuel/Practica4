import React from 'react'

export default function ProgramCard({ program }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="relative overflow-hidden">
                <img
                    src={program.images["Poster Art"].url}
                    alt={program.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/300x450?text=No+Image"
                    }}
                />
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                    {program.releaseYear || 'N/A'}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{program.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <span className="capitalize">{program.programType}</span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {program.releaseYear || 'Unknown'}
                    </span>
                </div>
            </div>
        </div>
    )
}