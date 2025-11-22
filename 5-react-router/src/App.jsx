import { createBrowserRouter, RouterProvider } from 'react-router'
import About from './pages/About'
import Home from './pages/Home'
import Layout from './pages/Layout'
import User from './pages/User'

// https://reactrouter.com/start/modes#data
let router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { path: '/', Component: Home },
      { path: '/about', Component: About },
      { path: '/user/:name', Component: User },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
