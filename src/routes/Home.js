import { useEffect, useState } from "react";
import { dbservice } from "fbase";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    // const getNweets = async (event) => {
    //     // event.preventDefault();
    //     const ref = collection(dbservice, "nweets3");
    //     const data = await getDocs(ref);
    //     const newData = data.docs.map(doc => ({
    //         ...doc.data()
    //     }));
    //     setNweets(newData);
    // };

    useEffect(() => {
        // getNweets();

        // onSnapshot 실시간 db
        const dbRef = collection(dbservice, 'nweets3');
        let data = [];
        onSnapshot(dbRef, docsSnap => {
            docsSnap.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
                setNweets(data);
            })
        });
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    < Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

