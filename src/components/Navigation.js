import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" component={Home}>Home</Link>
                </li>
                <li>
                    <Link to="/profile" component={Profile}>Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;