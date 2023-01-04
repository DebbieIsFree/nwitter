import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { async } from "@firebase/util";
import { collection, getDocs, orderBy, where } from "firebase/firestore";
import { dbservice } from "fbase";

const Profile = ({ userObj }) => {
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyNweets = async () => {
        const userRef = collection(dbservice, "nweets3");
        const query = query(userRef, where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    useEffect(() => {
        getMyNweets();
    }, [])

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;