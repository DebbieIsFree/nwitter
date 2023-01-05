import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, where, query } from "firebase/firestore";
import { dbservice, authService } from "fbase";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyNweets = async () => {
        const userRef = collection(dbservice, "nweets3");
        const qr = query(userRef, where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(qr);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.dispalyName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            }).then(() => {
                console.log("Profile Updated");
            }).catch((error) => {
                console.log("Profile update error");
            });
        }
        refreshUser();
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    value={newDisplayName || ""}
                    type="text"
                    placeholder="Display Name"
                    autoFocus
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    sytle={{ marginTop: 10, }}
                />
            </form>
            <span
                className="formBtn cancelBtn logOut"
                onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;