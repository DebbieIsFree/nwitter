import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // user 정보 새로고침
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
        });
      }
      else {
        setUserObj(null);
      }
      setInit(true);
    }, []);
  });

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj || ""}   // uncontrolled input element
        />
      ) : "initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()}Nwitter</footer> */}
    </>
  );
}

export default App;
