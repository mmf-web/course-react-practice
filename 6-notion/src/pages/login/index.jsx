import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../App'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: validate email and password
    // console.log(email, password)
    const response = {
      id: '123',
      email: 'test@test.com',
      name: 'Test User',
    }
    setUser(response)
    if (response.id) {
      navigate('/notes')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
