import { useState } from "react";
import { storageService, dbservice } from "fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        if (nweet === "") {
            return;
        }
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

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;