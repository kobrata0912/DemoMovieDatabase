import { useState, useContext, useEffect } from "react";
import UserContext from './utils/userContext';
import LoadingContext from './utils/loadingContext'
import { useHistory } from "react-router";

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
    history.push('/home');
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


  return (
    <UserContext.Provider value={{ user, logIn, logOut }} >
      <LoadingContext.Provider value={loading}>
          {props.children}
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
