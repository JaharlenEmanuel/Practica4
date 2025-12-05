import React from 'react'

export default function Header() {
    return <>
        <header className="bg-blue-500 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded"></div>
                        <h1 className="text-2xl font-bold">DEMO Streaming</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-300 hover:text-white">Log in</button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                            Start your free trial
                        </button>
                    </div>
                </div>
            </div>
        </header>
    </>

}
