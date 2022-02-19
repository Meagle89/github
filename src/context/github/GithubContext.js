import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext()

const { REACT_APP_GITHUB_URL, REACT_APP_GITHUB_TOKEN } = process.env 

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${REACT_APP_GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `${REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const {items} = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  const setLoading = () => dispatch({
    type: 'SET_LOADING'
  })

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    searchUsers,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext