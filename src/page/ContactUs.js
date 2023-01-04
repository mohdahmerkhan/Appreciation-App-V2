import React from "react";

function ContactUs() {
    // console.log("Contact Us");
    return (
        <div className="content card my-5">
            <div className="text-center">
                <div className="card-body">
                    <h3 className="card-title">
                        Contact Us
                    </h3>
                    <p className="card-text">
                        Address : Trivandrum, Kerala, India
                    </p>
                    <p className="card-text">
                        Email us on :
                        <a href="mailto:appreciationapp@gmail.com">
                            Appreciation App
                        </a>
                    </p>
                    <p className="card-text">
                        Phone : +91-999999999
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;