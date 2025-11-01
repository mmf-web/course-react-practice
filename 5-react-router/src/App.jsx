import { BrowserRouter, Routes, Route, NavLink, Link, Outlet } from 'react-router'
import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <div>
              Login
              <Link to="/">Submit</Link>
            </div>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Index</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
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
