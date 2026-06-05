// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// const AuthContext = createContext(null)

// const TOKEN_KEY = 'auth:token'
// const USER_KEY = 'auth:user'

// function readStorage() {
//     try {
//         const token = localStorage.getItem(TOKEN_KEY)
//         const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null')
//         return token && user ? { token, user } : null
//     } catch { return null }
// }

// export function AuthProvider({ children }) {
//     const [session, setSession] = useState(readStorage)   // { token, user } | null

//     // Keep state in sync if another tab logs in/out
//     useEffect(() => {
//         const sync = () => setSession(readStorage())
//         window.addEventListener('storage', sync)
//         return () => window.removeEventListener('storage', sync)
//     }, [])

//     /** Call this after a successful login API response */
//     const login = useCallback((token, user) => {
//         try {
//             localStorage.setItem(TOKEN_KEY, token)
//             localStorage.setItem(USER_KEY, JSON.stringify(user))
//         } catch { /* ignore */ }
//         setSession({ token, user })
//     }, [])

//     const logout = useCallback(() => {
//         try {
//             localStorage.removeItem(TOKEN_KEY)
//             localStorage.removeItem(USER_KEY)
//         } catch { /* ignore */ }
//         setSession(null)
//     }, [])

//     return (
//         <AuthContext.Provider
//             value={{
//                 isAuthed: !!session,
//                 user: session?.user ?? null,
//                 token: session?.token ?? null,
//                 login,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export function useAuth() {
//     const ctx = useContext(AuthContext)
//     if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
//     return ctx
// }


import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { store } from '../redux/store'           // ✅ direct store import
import { loadCart, clearCart } from '../redux/slices/cartSlice'

const AuthContext = createContext(null)

const TOKEN_KEY = 'auth:token'
const USER_KEY = 'auth:user'
const CART_KEY = 'cart'
const WISHLIST_KEY = 'wishlist:v1'

function readStorage() {
    try {
        const token = localStorage.getItem(TOKEN_KEY)
        const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null')
        return token && user ? { token, user } : null
    } catch { return null }
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState(readStorage)

    useEffect(() => {
        const sync = () => setSession(readStorage())
        window.addEventListener('storage', sync)
        return () => window.removeEventListener('storage', sync)
    }, [])

    const login = useCallback((token, user) => {
        try {
            localStorage.setItem(TOKEN_KEY, token)
            localStorage.setItem(USER_KEY, JSON.stringify(user))
        } catch { /* ignore */ }

        setSession({ token, user })
        store.dispatch(loadCart())   // ✅ login ke baad cart sync karo
    }, [])

    const logout = useCallback(() => {
        try {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)

        } catch { /* ignore */ }

        setSession(null)
        store.dispatch(clearCart())  // ✅ Redux store bhi empty
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthed: !!session,
                user: session?.user ?? null,
                token: session?.token ?? null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
    return ctx
}