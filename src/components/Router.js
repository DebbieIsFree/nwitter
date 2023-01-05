import React from "react";
import { BrowserRouter, HashRouter, Route, Switch }
    from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        // BrowserRouter하면 빈 페이지 error 발생
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                <>
                    {isLoggedIn ? (
                        <div
                            style={{
                                maxWidth: 890,
                                width: "100%",
                                margin: "0 auto",
                                marginTop: 80,
                                display: "flex",
                                justifyContent: "center"
                            }}>
                            <Route exact path="/">
                                <Home userObj={userObj} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile refreshUser={refreshUser} userObj={userObj} />
                            </Route>
                        </div>
                    ) : (
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    )}
                </>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;