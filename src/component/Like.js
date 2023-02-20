import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiURL } from "../config";
import { UserContext } from "./App";

function Like({ apprID }) {

    const { user } = useContext(UserContext);
    const [like, setLike] = useState(null);
    const [userLikeList, setUserLikeList] = useState([]);

    useEffect(() => {
        axios.get(apiURL + "api/likes/appreciation/" + apprID).then(
            (userLiked) => {
                setUserLikeList(userLiked.data);
                for (let likeItem of userLiked.data) {
                    if (likeItem.user.userID == user.userID) {
                        setLike(likeItem);
                    }
                }
            }
        );
    }, []);

    function toggleLike() {
        if (like == null) {
            axios.post(apiURL + "api/like", { userID: user.userID, apprID: apprID }).then(
                (likeResult) => {
                    setLike(likeResult.data);
                    userLikeList.push(likeResult.data);
                    setUserLikeList(userLikeList);
                }
            );
        }
        else {
            axios.delete(apiURL + "api/like/" + like.likeID).then(
                (result) => {
                    setLike(null);
                    let tempUserLikeList = userLikeList.filter((likeItem) => {
                        return (likeItem != like);
                    })
                    setUserLikeList(tempUserLikeList);
                }
            );
        }
    }

    return (
        <span className="respond" style={{ color: (like == null) ? "" : "blue" }} onClick={() => toggleLike()}>
            {(userLikeList.length == 0)?"":userLikeList.length}
            &nbsp;&nbsp;&nbsp;
            <i className={"fa-" + ((like == null) ? "regular" : "solid") + " fa-thumbs-up"}></i>
            &nbsp;
            Like
        </span>
    )
}

export default Like;