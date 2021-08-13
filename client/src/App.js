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

  const setFavorites = (userObject, favorites) => {
    setUser({
      ...userObject,
      favorites,
    });
  };
  const setNotes = (userObject, notes) => {
    setUser({
      ...userObject,
      notes,
    });
  };
  const setRatings = (userObject, ratings) => {
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
    <UserContext.Provider value={{ user, logIn, logOut, setFavorites, setNotes, setRatings }} >
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
