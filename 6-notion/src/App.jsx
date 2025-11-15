import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router'
import styles from './App.module.css'
import Login from './pages/login'
import Notes from './pages/notes'
import { useState, createContext, useContext } from 'react'
import WithAuth from './pages/with-auth'

export const AuthContext = createContext(null)
export const useAuthContext = () => useContext(AuthContext)

function App() {
  const [user, setUser] = useState(() => {
    const auth = localStorage.getItem('auth')
    if (!auth) {
      return null
    }
    try {
      return JSON.parse(auth)
    } catch {
      return null
    }
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (user) => {
          localStorage.setItem('auth', JSON.stringify(user))
          setUser(user)
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <WithAuth>
                <Layout />
              </WithAuth>
            }
          >
            <Route index element={<div>Index</div>} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

function Layout() {
  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.navActive : '')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.navActive : '')}>
          About
        </NavLink>
      </header>
      <Outlet />
      <footer>
        <div>MMF @ BSU</div>
      </footer>
    </>
  )
}

export default App
