import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'
import useFetch from '../hooks/useFetch'
import { useState } from 'react'

export default function Home() {
    const { data, loading, error } = useFetch('/sample.json')

    const [filter, setFilter] = useState('all') // 'all', 'series', 'movies'

    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
    )
}