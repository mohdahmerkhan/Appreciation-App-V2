import React from "react";

function PageNotFound() {

    // console.log("Page Not Found");
    
    return (
        <div className="content card my-5">
            <div className="text-center">
                <div className="card-body">
                    <h3 className="card-title">
                        Sorry  Page Not Found !
                    </h3>
                    <p className="card-text">
                        Page Not Found (ERROR - 404)
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;