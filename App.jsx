import { useReducer } from 'react'

const INITIAL_STATE = {
  auth: { data: null, error: null, loading: false },
}

// Pure function
export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN/START':
      return {
        ...state,
        auth: { data: null, error: null, loading: true },
      }
    case 'LOGIN/SUCCESS':
      return {
        ...state,
        auth: { data: action.payload, error: null, loading: false },
      }
    case 'LOGIN/ERROR':
      return {
        ...state,
        auth: { data: null, error: action.payload, loading: false },
      }
    default:
      return state
  }
}

// Pure function
export const anyOtherReducer = (state = INITIAL_STATE, action) => {
  return state
}

// Pure function
const combineReducers =
  (...reducerFns) =>
  (state, action) =>
    reducerFns.reduce((state, f) => f(state, action), state)

// Action creators
const startLogin = () => ({ type: 'LOGIN/START' })
const successLogin = (user) => ({
  type: 'LOGIN/SUCCESS',
  payload: user,
})
const errorLogin = (error) => ({
  type: 'LOGIN/ERROR',
  payload: error,
})

export default function App() {
  const [state, dispatch] = useReducer(combineReducers(authReducer, anyOtherReducer), INITIAL_STATE)

  if (state?.auth?.loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {state?.auth?.data ? <div>Logged in</div> : <div>Logged out</div>}

      {!state?.auth?.data && (
        <button
          onClick={() => {
            dispatch(startLogin())
            setTimeout(() => {
              if (Math.random() > 0.5) {
                dispatch(errorLogin('Password is incorrect'))
              } else {
                dispatch(successLogin({ id: 1, username: 'test' }))
              }
            }, 1000)
          }}
        >
          Login
        </button>
      )}
    </div>
  )
}
