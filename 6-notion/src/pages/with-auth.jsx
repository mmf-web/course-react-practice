import { useAuthContext } from '../App'
import { Navigate } from 'react-router'

export default function WithAuth({ children }) {
  const { user } = useAuthContext()

  if (!user?.id) {
    return <Navigate to="/login" />
  }

  return children
}
