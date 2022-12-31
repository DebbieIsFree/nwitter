import { useEffect, useState } from "react";
import { dbservice } from "fbase";
import { setDoc, doc, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Nweet from "components/Nweet";

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

    const onChange = async (event) => {
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
    // const getNweets = async () => {
    //     const userRef = collection(dbservice, "nweets");
    //     getDocs(userRef).then((snap) => {
    //         snap.forEach((doc) => {
    //             setNweets({ id: doc.id, ...doc.data() });
    //         });
    //     });
    // }

    useEffect(() => {
        // setNweets();
        // getNweets();

        const dbRef = collection(dbservice, 'nweets');
        onSnapshot(dbRef, docSnap => {
            let data = [];
            docSnap.forEach(doc => {
                // console.log("Current data: ", doc.data());
                // console.log("doc Id", doc.id);
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
                setNweets(data);
            })
        });
    });


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
            <div>
                {nweets.map((nweet) => (
                    < Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
            {/* {<Nweet
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
            />} */}
        </div>
    );
};

export default Home;

