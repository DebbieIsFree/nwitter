import { useEffect } from "react";
import { Link } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    {/* Link안에 component={Home}하면 <Home/> 렌더링 함 */}
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;