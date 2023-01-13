import React from "react";

function UnderConstruction({ pageName }) {

    // console.log("Page Not Found");
    
    return (
        <div className="content card my-5">
            <div className="text-center">
                <div className="card-body">
                    <h3 className="card-title">
                    <b>"{ pageName + " Page"}"</b> - Under Construction
                    </h3>
                    <p className="card-text">
                        This page is under construction and will be avaible soon
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UnderConstruction;