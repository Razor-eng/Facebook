import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, logoutuser, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Home from './components/Home';

function App() {
  const [login, setLogin] = useState('login')
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const chooseMessage = (message) => {
    setLogin(message);
  };

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(loginuser({
          email: userAuth.email,
          uid: userAuth.uid,
          photoURL: userAuth.photoURL,
          displayName: userAuth.displayName
        }));
      }
      else {
        dispatch(logoutuser());
      }
    })
    setLogin('login')
  }, [])
  console.log(user)
  return (
    <div className="App">
      {!user ?
        (
          login === 'login' ?
            < Login chooseMessage={chooseMessage} />
            :
            <Register chooseMessage={chooseMessage} />
        )
        : (
          <Home />
        )}
    </div>
  );
}

export default App;
