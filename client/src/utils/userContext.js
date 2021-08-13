import React from 'react'

const UserContext = React.createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
  userFavorites: null,
  userNotes: null,
  userRatings: null
})

export default UserContext