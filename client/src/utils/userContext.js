import React from 'react'

const UserContext = React.createContext({
  user: null,
  userFavorites: null,
  userNotes: null,
  userRatings: null,
  logIn: () => {},
  logOut: () => {},
  addFavorites: () => {},
  addRatings: () => {},
  addNotes: () => {},
  removeFavorites: () => {},
  removeRatings: () => {},
  removeNotes: () => {},
})

export default UserContext