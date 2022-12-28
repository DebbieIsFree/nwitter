import React from "react";
import { BrowserRouter, HashRouter as Router, Route, Switch }
    from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <Route exact path="/">
                        <Home />
                    </Route>,
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
                {/* <Redirect from="*" to="/" /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;