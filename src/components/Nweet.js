import { dbservice } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            // console.log("Obj Result: ", nweetObj);
            // firebase v9 : onSnapshot은 async-await 사용 불가

            // const data = doc(dbservice, 'nweets/%{nweetObj.id}');
            // console.log("data : ", data);
            deleteDoc(doc(dbservice, "nweets", nweetObj.id))
                .then(() => {
                    console.log("Entire Document has been deleted");
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div>
            <h4>{nweetObj.text}</h4>
            {/*  하위 컴포넌트에서 상위 컴포넌트로부터 넘겨받은 데이터 result를 
            사용할 때는 props.result의 형태로 사용해야 한다. */}
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button>Edit Nweet</button>
                </>
            )
            }
        </div >
    );
};

export default Nweet;