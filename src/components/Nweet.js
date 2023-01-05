import { dbservice, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { deleteObject, ref } from "firebase/storage";

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
            if (nweetObj.attachmentUrl !== "") {
                console.log("nweetObj.attachmentUrl : ", nweetObj.attachmentUrl);
                deleteObject(ref(storageService, nweetObj.attachmentUrl))
                    .then(() => { console.log("이미지 삭제 성공"); })
                    .catch((error) => { console.log("이미지 삭제 실패"); })
            }
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
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                            onChange={onChange}
                            value={newNweet}
                            required
                            placeholder="Edit your nweet"
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl}
                        width={"50px"} height={"50px"} />}
                    {/* 하위 컴포넌트에서 상위 컴포넌트로부터 넘겨받은 데이터 result를
                    사용할 때는 props.result의 형태로 사용해야 한다.  */}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div >
    );
};

export default Nweet;