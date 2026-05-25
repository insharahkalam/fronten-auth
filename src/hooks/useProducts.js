import { useState, useEffect, useCallback } from 'react'
import api from '../config/service'

export function useProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await api.get('/products/getAllProduct')
            console.log(res,'show product res');
            
            // Support both { products: [] } and direct []
            const data = res.data?.getProduct 
            setProducts(Array.isArray(data) ? data : [])
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load products')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchProducts() }, [fetchProducts])

    return { products, loading, error, refetch: fetchProducts }
}