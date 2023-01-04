import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
      // updateProfile: (args) => updateProfile(authService.currentUser, { args })
    });
  };

  // user 정보 새로고침
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
          // updateProfile: (args) => updateProfile(authService.currentUser, { args })
        });
      }
      else {
        setUserObj(false);
      }
      setInit(true);
    }, []);
  });

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj || ""}   // uncontrolled input element
        />
      ) : "initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()}Nwitter</footer> */}
    </>
  );
}

export default App;
