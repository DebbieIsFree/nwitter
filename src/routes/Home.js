import { useEffect, useState, useRef } from "react";
import { dbservice, storageService } from "fbase";
import { setDoc, doc, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuid4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    const onFileSubmit = (event) => {
        event.preventDefault();
        // if (nweet === "") {
        //     return;
        // }
        let attachmentUrl = "";
        if (attachment !== "") {
            console.log("${userObj.uid} : ", userObj.uid);

            // Data URL string
            const storageRef = ref(storageService, `${userObj.uid}/${uuid4()}}`);
            // attachmentUrl = getDownloadURL(ref(storageService, `gs://bucket/${userObj.uid}/${uuid4()}.png`));
            uploadString(storageRef, attachment, 'data_url')
                .then(() => {
                    // attachmentUrl = getDownloadURL(ref(storageService, `${userObj.uid}/${uuid4()}.png`))
                    getDownloadURL(ref(storageService, storageRef))
                        .then(() => {
                            console.log('Uploaded a data_url string!');
                            console.log("attachmentUrl : ", attachmentUrl);
                            const nweetObj = {
                                text: nweet,
                                createdAt: Date.now(),
                                creatorId: userObj.uid,
                                attachmentUrl,
                            };
                            addDoc(collection(dbservice, "nweets3"), nweetObj)
                                .then(docRef => {
                                    console.log("Document has been added successfully");
                                })
                                .catch(error => {
                                    console.log("File Submit error");
                                })
                            setNweet("");   // 초기화
                            setAttachment("");
                        })
                })
                .catch((error) => {
                    console.log("failed");
                })
        }
    };


    const onFileChange = (event) => {
        event.preventDefault();
        // 파일 1개 전송
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            setAttachment(finishedEvent.currentTarget.result);
        };
        reader.readAsDataURL(file);
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

    const onClearAttachment = () => {
        setAttachment("");
    }

    const getNweets = async (event) => {
        // event.preventDefault();
        const ref = collection(dbservice, "nweets3");
        const data = await getDocs(ref);
        const newData = data.docs.map(doc => ({
            ...doc.data()
        }));
        setNweets(newData);
    };

    useEffect(() => {
        getNweets();

        // onSnapshot 실시간 db
        const dbRef = collection(dbservice, 'nweets3');
        let data = [];
        onSnapshot(dbRef, docsSnap => {
            docsSnap.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
                console.log("doc.data() : ", doc.data());
                setNweets(data);
            })
        });
    }, []);


    return (
        <div>
            <form onSubmit={onFileSubmit}>
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

