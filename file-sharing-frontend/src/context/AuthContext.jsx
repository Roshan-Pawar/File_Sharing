import { createContext, useState, useEffect } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (token) setUser({ token })
  }, [])

  const login = (userData) => setUser(userData)
   const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
