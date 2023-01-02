import { useEffect, useState, useRef } from "react";
import { dbservice, storageService } from "fbase";
import { setDoc, doc, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuid4 } from "uuid";
import { ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // const onSubmit = async (event) => {
    //     event.preventDefault();
    //     const data = {
    //         text: nweet,
    //         createdAt: Date.now(),
    //         creatorId: userObj.uid
    //     };
    //     await addDoc(collection(dbservice, "nweets"), data)
    //         .then(docRef => {
    //             console.log("Document has been added successfully");
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // };

    const onSubmit = async (event) => {
        event.preventDefault();

        const metaData = {
            contentType: 'image/*'
        };

        const storageRef = ref(storageService, `${userObj.uid}/${uuid4()}`);
        const response = uploadString(storageRef, attachment, 'data_url');
        console.log("response : ", response);
    };

    const onChange = async (event) => {
        event.preventDefault();
        try {
            const {
                target: { value },
            } = event;
            setNweet(value);
        } catch (error) {
            console.log("Not Changed");
        }
    };

    const onFileChange = (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (finishedEvent) => {
            setAttachment(finishedEvent.currentTarget.result);
            console.log("finishedEvent.currentTarget.resultt : ", finishedEvent.currentTarget.result);
            console.log("Attachment : ", attachment);
        };
        reader.readAsDataURL(file);
    };

    const onClearAttachment = () => {
        setAttachment("");
    }

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

        // onSnapshot 실시간 db
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
                <input onChange={onFileChange} type="file" accept="image/*" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
                <input type="submit" value="Send Nweet" />
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

