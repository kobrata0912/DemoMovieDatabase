import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import UserContext from './utils/userContext';
import LoadingContext from './utils/loadingContext';
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

  const addFavorites = (userObject, favorite) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "add", movie_id: favorite })
    }
    try {
      fetch("http://localhost:4001/favorites", requestOptions)
        .then(res => {
          if (res.status === 200) {
            toast.success("Added to favorites")
            const newFavorites = [...user.favorites.movies_ids, favorite]
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
          //loadingContext.hideLoading();
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }

  };
  const addNotes = (userObject, notes) => {
    setUser({
      ...userObject,
      notes,
    });
  };
  const addRatings = (userObject, ratings) => {
    setUser({
      ...userObject,
      ratings,
    });
  };

  const removeFavorites = (userObject, favorite) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'x-access-token': user.user.token },
      body: JSON.stringify({ type: "delete", movie_id: favorite })
    }
    try {
      fetch("http://localhost:4001/favorites", requestOptions)
        .then(res => {
          if (res.status === 200) {
            toast.success("Removed from favorites")
            const newFavorites = user.favorites.movies_ids.filter((id) => id !== favorite)
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
          //loadingContext.hideLoading();
          toast.error(e);
        });

    } catch (e) {
      toast.error(e.message)
    }
  };
  const removeNotes = (userObject, notes) => {
    setUser({
      ...userObject,
      notes,
    });
  };
  const removeRatings = (userObject, ratings) => {
    setUser({
      ...userObject,
      ratings,
    });
  };

  const showLoading = () => {
    toggleLoading((prevState) => {
      return {
        ...prevState,
        shouldBeLoading: true,
      };
    });
  };

  const hideLoading = () => {
    toggleLoading((prevState) => {
      return {
        ...prevState,
        shouldBeLoading: false,
      };
    });
  };

  const loadingState = {
    shouldBeLoading: false,
    showLoading,
    hideLoading,
  };

  const [loading, toggleLoading] = useState(loadingState);

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
          //loadingContext.hideLoading();
        })
        .catch((e) => {
          //loadingContext.hideLoading();
          toast.error(e);
        });
    } else {
      //hideLoading();
    }
  }, [user.loggedIn]);

  return (
    <UserContext.Provider value={{ user, logIn, logOut, addFavorites, addNotes, addRatings, removeFavorites, removeNotes, removeRatings }} >
      <LoadingContext.Provider value={loading}>
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
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
