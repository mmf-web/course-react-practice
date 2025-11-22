import { NavLink, Outlet } from 'react-router'

// ! TODO: CSS Modules !
import classes from './Layout.module.css'

export default function Layout() {
  function handleActive({ isActive }) {
    return isActive ? classes.active : ''
  }
  return (
    <>
      <header style={{ display: 'flex', gap: '10px' }}>
        <NavLink to="/" className={handleActive}>
          Home
        </NavLink>
        <NavLink to="/about" className={handleActive}>
          About
        </NavLink>
        <NavLink to="/user/John" className={handleActive}>
          User John
        </NavLink>
        <NavLink to="/user/Ivan" className={handleActive}>
          User Ivan
        </NavLink>
      </header>
      <Outlet />
      <footer>2025@BSU</footer>
    </>
  )
}
