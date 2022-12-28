import { useEffect, useState } from "react";
import { dbservice } from "fbase";

import { getFirestore, collection, addDoc } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const [error, setError] = useState("");


    // const dbRef = collection(dbservice, "nweets");
    // const data = {
    //     text: nweet,
    //     createdAt: Date.now()
    // };

    // addDoc(dbRef, data)
    //     .then(dbRef => {
    //         console.log("has been added success!");
    //         console.log(dbRef.id);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await dbservice.collection("nweets").add({
                text: nweet,
                createdAt: Date.now(),
            });
            setNweet("");
        } catch (error) {
            setError(error.message);
        }
    }
    //     const dbRef = collection(dbservice, "nweets");
    //     const data = {
    //         text: nweet,
    //         createdAt: Date.now()
    //     };

    //     addDoc(dbRef, data)
    //         .then(dbRef => {
    //             console.log("has been added success!");
    //             console.log(dbRef.id);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // };

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

    // const getNweets = async () => {
    //     const dbNweets = await dbservice.collection("nweets").get();
    //     dbNweets.forEach(document => {
    //         const nweetObject = { ...document.data(), id: document.id };
    //         setNweets((prev) => [nweetObject, ...prev])
    //     });
    // };

    // useEffect(() => {
    //     getNweets();
    // }, []);


    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <div className="form_container">
                    <input
                        onChange={onChange}
                        value={nweet}
                        type="text"
                        placeholder="What's on your mind?"
                        maxLength={120}
                    />
                    <label><input type="submit" value="send" />Send</label>
                </div>
            </form>
        </>
    );
};

export default Home;

