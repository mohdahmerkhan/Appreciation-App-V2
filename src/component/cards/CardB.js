import React from "react";
import "./CardB.css";

function CardB({ appreciation }) {
    function tagsToString() {
        let tempTagArray = appreciation.tags;
        let tagsToStr = " ";

        if (tempTagArray.length < 2) {
            tagsToStr = tempTagArray[0];
            return;
        }

        let tempString = "";
        for (let i = 0; i < tempTagArray.length - 2; i += 1) {
            tempString += tempTagArray[i] + " , ";
        }
        tempString += tempTagArray[tempTagArray.length - 2] + " and " + tempTagArray[tempTagArray.length - 1];
        tagsToStr = tempString;

        return " " +tagsToStr;
    }
    return (
        <div className="container cardBContainer">
            <div className="logo">
                <img src='https://www.nissanmotor.jobs/ami/india/ndi/assets/images/logo.svg' alt='Nissan Logo' />
            </div>
            <div className="title">
                The
                <br />
                BUCK
                <br />
                <div className="black">
                    <span className="bold">
                        STOPS
                    </span>
                    <br />
                    <span className="small">
                        - - - with - - -
                    </span>
                </div>
                <br />
                <div className="blueBold">
                    ME
                </div>
            </div>
            <div className="content">
                This is shout out for
            </div>

            <div className='recipientAndSender'>
                {appreciation.user.fullName}
            </div>
            <div className='content'>
                From
            </div>
            <div className='recipientAndSender'>
                {appreciation.recommendBy.fullName}
            </div>
            <div className='content'>
                for displaying the Nissan Value of being
                <i>
                    {tagsToString()}
                </i>
            </div>


            <div className="thankNotes">
                ---------
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Thank You
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ---------
            </div>
        </div>
    );
}

export default CardB;