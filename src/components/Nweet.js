import { dbservice, storageService } from "fbase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);  // toggle
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const toggleEditing = () => setEditing((prev) => !prev);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            // firebase v9 : onSnapshot은 async-await 사용 불가
            deleteDoc(doc(dbservice, "nweets3", `${nweetObj.id}`))
                .then(() => {
                    console.log("Document has been deleted");
                })
                .catch((error) => {
                    console.log("error");
                })
        }
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const docRef = doc(dbservice, "nweets3", nweetObj.id);

        updateDoc(docRef, { text: newNweet })
            .then(() => {
                console.log("The value of nweet is updated!");
            })
            .catch((error) => {
                console.log("error");
            })
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl}
                        width={"50px"} height={"50px"} />}
                    {/* 하위 컴포넌트에서 상위 컴포넌트로부터 넘겨받은 데이터 result를
                    사용할 때는 props.result의 형태로 사용해야 한다.  */}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div >
    );
};

export default Nweet;