import { useParams } from 'react-router'

export default function User() {
  const { name } = useParams()
  return <div>User: {name}</div>
}
