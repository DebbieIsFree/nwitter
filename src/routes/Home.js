import { useEffect, useState } from "react";
import { dbservice } from "fbase";
import { setDoc, doc, getDocs, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { authService } from "fbase";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [error, setError] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        };
        await addDoc(collection(dbservice, "nweets"), data)
            .then(docRef => {
                console.log("Document has been added successfully");
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onChange = (event) => {
        event.preventDefault();
        try {
            const {
                target: { value },
            } = event;
            setNweet(value);
        } catch (error) {
            setError(error.message);
        }
    };

    // onSnapshot 실시간 db
    const getNweets = async () => {
        const userRef = collection(dbservice, "nweets");

        getDocs(userRef).then((snap) => {
            snap.forEach((doc) => {
                //console.log(doc.id);
                //console.log(doc.data());
                const newArray = { id: doc.id, data: doc.data() };
                //setNweets(newArray);
                console.log(newArray);
            });
        });
    };

    useEffect(() => {
        getNweets();
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={nweet}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
};


export default Home;

