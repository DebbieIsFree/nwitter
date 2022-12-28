// import { async } from "@firebase/util";
import { authService, firebaseInstance } from "fbase";
import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider
} from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const auth = getAuth();

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            // provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            // provider = new firebaseInstance.auth.GithubAuthProvider();
            provider = new GithubAuthProvider();
        }
        // const data = await authService.signInWithPopup(provider);
        const data = await createUserWithEmailAndPassword(auth, email, password);
    };

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침 x
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            return data;
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Email" required name="email"
                    value={email} onChange={onChange} />
                <input type="password" placeholder="Password" required
                    name="password" value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log In" : "Sign In"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;