import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-800 border-t border-gray-700 mt-12">
            <div className="container mx-auto px-4 py-8">

                <div className="border-t border-gray-700 pt-6">
                    <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4">
                        <a href="#" className="text-gray-400 hover:text-white">Home</a>
                        <a href="#" className="text-gray-400 hover:text-white">Terms and Conditions</a>
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white">Collection Statement</a>
                        <a href="#" className="text-gray-400 hover:text-white">Help</a>
                        <a href="#" className="text-gray-400 hover:text-white">Manage Account</a>
                    </div>
                    <p className="text-gray-400 text-center md:text-left">
                        Copyright © 2016 DEMO Streaming. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
