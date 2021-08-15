import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import UserContext from './utils/userContext';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {

  const history = useHistory();
  const [user, setUser] = useState(
    props.user
      ? {
        ...props.user,
        loggedIn: true,
      }
      : {
        loggedIn: false,
      }
  );

  const logIn = (userObject) => {
    setUser({
      ...userObject,
      loggedIn: true,
    });
  };

  const logOut = () => {
    setUser({
      loggedIn: false,
    });
    localStorage.setItem('email', '');
    localStorage.setItem('password', '');
    toast.success('Logged out successfully');
    history.push('/home');
  };

  const addFavorites = (userObject, movie) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "add", movie })
    }
    try {
      fetch("http://localhost:4001/favorites", requestOptions)
        .then(res => {
          if (res.status === 200) {
            toast.success("Added to favorites")
            const newFavorites = [...user.favorites.movies_ids, movie]
            setUser({
              ...userObject,
              favorites: {
                ...userObject.favorites,
                movies_ids: newFavorites
              }
            })
          }
        })
        .catch((e) => {
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }

  };

  const addNotes = (userObject, note) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "add", note })
    }
    try {
      fetch("http://localhost:4001/notes", requestOptions)
        .then(res => {
          if (res.status === 200) {
            let i = undefined
            let newNotes = [];
            const alreadyNoted = user.notes.movies.filter((x, index) => {
              if (x.id === note.id) {
                i = index
                return true
              } else {
                return false
              }
            }).length !== 0 ? true : false

            if (alreadyNoted) {
              newNotes = [...user.notes.movies]
              newNotes[i].note = note.note;
              setUser({
                ...userObject,
                notes: {
                  ...userObject.notes,
                  movies: newNotes
                }
              })
            } else {
              newNotes = [...user.notes.movies, note]
              setUser({
                ...userObject,
                notes: {
                  ...userObject.notes,
                  movies: newNotes
                }
              })
            }
            toast.success("Your note was saved")
          }
        })
        .catch((e) => {
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }
  };

  const addRatings = (userObject, rating) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "add", rating })
    }
    try {
      fetch("http://localhost:4001/ratings", requestOptions)
        .then(res => {
          if (res.status === 200) {
            let i = undefined
            let newRatings = [];
            const alreadyRated = user.ratings.movies.filter((x, index) => {
              if (x.id === rating.id) {
                i = index
                return true
              } else {
                return false
              }
            }).length !== 0 ? true : false

            if (alreadyRated) {
              let newRatings = [...user.ratings.movies]
              newRatings[i].rating = rating.rating;
              setUser({
                ...userObject,
                ratings: {
                  ...userObject.ratings,
                  movies: newRatings
                }
              })
            } else {
              newRatings = [...user.ratings.movies, rating]
              setUser({
                ...userObject,
                ratings: {
                  ...userObject.ratings,
                  movies: newRatings
                }
              })
            }
            toast.success("Your rating was saved")
          }
        })
        .catch((e) => {
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }
  };

  const removeFavorites = (userObject, movie) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "delete", movie })
    }
    try {
      fetch("http://localhost:4001/favorites", requestOptions)
        .then(res => {
          if (res.status === 200) {
            toast.success("Removed from favorites")
            const newFavorites = user.favorites.movies_ids.filter((favorite) => favorite.id !== movie.id)
            setUser({
              ...userObject,
              favorites: {
                ...userObject.favorites,
                movies_ids: newFavorites
              }
            })
          }
        })
        .catch((e) => {
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }
  };

  const removeNotes = (userObject, note_id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "delete", note_id })
    }
    try {
      fetch("http://localhost:4001/notes", requestOptions)
        .then(res => {
          if (res.status === 200) {
            toast.success("Your note was removed")
            const newNotes = user.notes.movies.filter((note) => note.id !== note_id)
            setUser({
              ...userObject,
              notes: {
                ...userObject.notes,
                movies: newNotes
              }
            })
          }
        })
        .catch((e) => {
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }
  };

  const removeRatings = (userObject, movie_id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "delete", movie_id })
    }
    try {
      fetch("http://localhost:4001/ratings", requestOptions)
        .then(res => {
          if (res.status === 200) {
            toast.success("Your rating was removed")
            const newRatings = user.ratings.movies.filter((rating) => rating.id !== movie_id)
            setUser({
              ...userObject,
              ratings: {
                ...userObject.ratings,
                movies: newRatings
              }
            })
          }
        })
        .catch((e) => {
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && email !== '' && password && password !== '' && user.loggedIn === false) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email, password })
      }

      fetch("http://localhost:4001/login", requestOptions)
        .then(res => res.json())
        .then(authUser => {
          logIn(authUser);
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  }, [user.loggedIn]);

  return (
    <UserContext.Provider value={{ user, logIn, logOut, addFavorites, addNotes, addRatings, removeFavorites, removeNotes, removeRatings }} >
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {props.children}
    </UserContext.Provider>
  );
}

export default App;
