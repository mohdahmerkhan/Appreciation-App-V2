import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { apiURL } from "../config";
import { UserContext } from "./App";

function Comment({ comment, replyOnID, setReplyOnID }) {

    const { user } = useContext(UserContext);
    const [replyText, setReplyText] = useState("");
    const [commentLocal, setCommentLocal] = useState(comment);


    function recursiveMap(replyList) {
        if ((replyList == undefined) || (replyList.length == 0)) {
            return "";
        }

        let replyCommentHTML = replyList.map(
            (replyComment) => {
                return (
                    <Comment comment={replyComment}
                        replyOnID={replyOnID}
                        setReplyOnID={setReplyOnID}
                        key={replyComment.commentID} />
                );
            }
        );

        return (
            <div className="replyComment">
                {replyCommentHTML}
            </div>
        );
    }


    function replyOnComment() {
        const reqObject = {
            commentMessage: replyText,
            userID: user.userID,
            apprID: commentLocal.apprID,
            replyOnID: commentLocal.commentID,
        };
        axios.post(apiURL + "api/comment/", reqObject).then(
            (response) => {
                let tempComment = commentLocal;
                if(tempComment.hasReply === undefined)
                {
                    tempComment.hasReply = [];
                }
                tempComment.hasReply.unshift(response.data);
                setCommentLocal(tempComment);
                setReplyText("");
                setReplyOnID(0);
            }
        );
    }

    return (
        <Fragment>
            <div className="commentContainer">
                <div className="profileImg">
                    <img src={apiURL + "images/profile-picture/" + commentLocal.user.userID + ".jpg"} />
                </div>
                <div className="comment">
                    <div className="replyIcon" onClick={() => setReplyOnID(commentLocal.commentID)}>
                        <i className="fa fa-reply" style={{ fontStyle: "24px" }} aria-hidden="true"></i>
                    </div>
                    <div className="commentOwner">
                        {commentLocal.user.fullName}
                    </div>
                    <div className="timeAgo">
                        9h
                    </div>
                    <div className="commentMessage">
                        {commentLocal.commentMessage}
                    </div>
                    <div className="replyInput" style={
                        {
                            display: (replyOnID == commentLocal.commentID) ? "block" : "none",
                        }}>
                        <input className="commentReply"
                            type="text"
                            placeholder="Reply the comment"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)} />
                        <button className="replySend" disabled={(replyText == "" ? true : false)} onClick={() => replyOnComment()}>
                            Reply
                        </button>
                    </div>
                </div>
            </div>
            {recursiveMap(comment.hasReply)}
        </Fragment>
    );
}

export default Comment;