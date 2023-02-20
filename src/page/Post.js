import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../config";
import Card from "../component/Card";
import TimeAgo from "../component/TimeAgo";
import Like from "../component/Like";
import CommentList from "../component/CommentList";
import { UserContext } from "../component/App";

function Post() {
    const { apprID } = useParams();
    const { user } = useContext(UserContext);
    const [appreciation, setAppreciation] = useState(null);
    const [comments, setComments] = useState([]);
    const [replyOnID, setReplyOnID] = useState(0);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        axios.get(apiURL + "api/appreciation/" + apprID).then(
            (response) => {
                setAppreciation(response.data);
            }
        );
        axios.get(apiURL + "api/comments/appreciation/" + apprID).then(
            async (commentList) => {
                for (let commentItem of commentList.data) {
                    await addReplies(commentItem);
                }
                setComments(commentList.data);
            }
        )

    }, []);

    async function addReplies(whereToAdd) {
        await axios.get(apiURL + "api/comments/reply/" + whereToAdd.commentID).then(
            (replyList) => {
                whereToAdd.hasReply = replyList.data;
            }
        );
        if (whereToAdd.hasReply.length == 0) {
            return;
        }
        for (let replyItem of whereToAdd.hasReply) {
            await addReplies(replyItem);
        }
    }

    function commentOnPost() {
        const reqObject = {
            commentMessage: commentText,
            userID: user.userID,
            apprID: apprID,
            replyOnID: null,
        };
        axios.post(apiURL + "api/comment/", reqObject).then(
            (response) => {
                let tempArray = comments;
                tempArray.unshift({ hasReply: [], ...response.data });
                setComments(tempArray);
                setCommentText("");
            }
        );
    }

    return (
        <Fragment>
            {
                appreciation
                &&
                <div className="contentContainer">
                    <div className="timelineCardList">
                        <div className="timelineCard" key={appreciation.apprID}>
                            <img src={apiURL + "images/profile-picture/" + appreciation.user.userID + ".jpg"} />
                            <div className="content">
                                {appreciation.user.fullName} <span style={{ color: "darkslategrey", fontSize: "medium" }}>was appreciated by</span> {appreciation.recommendBy.fullName}
                            </div>
                            <div className="timeAgo">
                                <TimeAgo createdDate={appreciation.createdDate} />
                            </div>
                            <div className="photo">
                                <Card appreciationID={appreciation.apprID} />
                            </div>
                            <div className="caption">
                                #Cheers #Thank You
                            </div>
                            <div className="respondList">
                                <Like apprID={appreciation.apprID} />
                                <span className={"respond" + ((replyOnID == 0) ? " disable" : "")} onClick={() => setReplyOnID(0)}>
                                    <i className="fa-regular fa-comment"></i>
                                    &nbsp;
                                    Comment
                                </span>
                                <span className="respond">
                                    <i className="fa-solid fa-share"></i>
                                    &nbsp;
                                    Share
                                </span>
                            </div>
                            <div className={"commentList" + ((replyOnID == 0) ? "" : " disable")} style={{ marginTop: "0px", padding: "0px" }}>
                                <div className="replyInput">
                                    <input className="commentReply" type="text" placeholder="Leave your comment"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)} />
                                    <button className="replySend"
                                        style={{ opacity: (commentText == "" ? 0.3 : 1) }}
                                        disabled={(commentText == "" ? true : false)} onClick={() => commentOnPost()}>
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <CommentList commentsArray={comments} replyOnID={replyOnID} setReplyOnID={setReplyOnID} />
                    </div>
                </div>
            }
        </Fragment>

    );
}

export default Post;