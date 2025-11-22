import { Outlet, NavLink } from 'react-router'
import classes from './Layout.module.css'

export default function Layout() {
  return (
    <>
      <header>
        <NavLink to="/notes" className={({ isActive }) => (isActive ? classes.active : '')}>
          Notes
        </NavLink>
        <NavLink to="/login">Login</NavLink>
      </header>
      <Outlet />
      <footer>2025@BSU</footer>
    </>
  )
}
