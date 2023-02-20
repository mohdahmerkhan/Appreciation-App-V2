import { Fragment } from "react";
import Comment from "./Comment";
function CommentList({ commentsArray, replyOnID, setReplyOnID }) {

    let renderCommentList = commentsArray.map(
        (comment) => {
            return (
                <Comment comment={comment}
                    replyOnID={replyOnID}
                    setReplyOnID={setReplyOnID}
                    key={comment.commentID} />
            );
        }
    );

    return (
        <div className="commentList">
            {renderCommentList}
        </div>
    );
}

export default CommentList;