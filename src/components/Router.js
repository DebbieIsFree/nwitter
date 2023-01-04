import React from "react";
import { BrowserRouter, HashRouter as Router, Route, Switch }
    from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile refreshUser={refreshUser} userObj={userObj} />
                        </Route>
                    </>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;