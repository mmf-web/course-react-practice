import { useContext } from 'react'
import { AuthContext } from '../../App'

export default function Notes() {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <h1>Notes</h1>
      {user ? <div>Notes of {user.id}</div> : <div>Please login</div>}
    </div>
  )
}
