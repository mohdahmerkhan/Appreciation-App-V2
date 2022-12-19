import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../component/App";
import { apiURL } from "../config";
import CardA from "../component/cards/CardA";
import CardB from "../component/cards/CardB";
import CardC from "../component/cards/CardC";

function Card() {
    const { user } = useContext(UserContext);
    const { appreciationID } = useParams();
    const [appreciation, setAppreciation] = useState(null);

    useEffect(() => {

        if (user) {
            axios.get(apiURL + 'api/appreciation/' + appreciationID).then(
                (response) => {
                    setAppreciation(response.data);
                }
            );
        }

    }, [user]);

    let renderCard;
    if (appreciation) {
        switch (appreciation.template.templateID) {
            case 1:
                renderCard = <CardA appreciation={appreciation} />
                break;

            case 2:
                renderCard = <CardB appreciation={appreciation} />
                break;

            case 3:
                renderCard = <CardC appreciation={appreciation} />
                break;
        }
    }

    return <h1>{appreciation && renderCard}</h1>;
}

export default Card;