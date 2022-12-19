import "./RecommendForm.css";
import React, { createContext, useContext, useState } from "react";
import TemplateList from "../component/TemplateList";
import ValueList from "../component/ValueList";
import Who from "../component/Who";
import { UserContext } from "../component/App";
import axios from "axios";
import { apiURL } from "../config";
import { Navigate } from "react-router-dom";

export const RecommendErrorContext = createContext();

function RecommendForm() {

    const [staff, setStaff] = useState(null);
    const [ccTo, setCcTo] = useState([]);
    const [template, setTemplate] = useState(null);
    const [values, setValues] = useState([]);
    const [isSubmit, setSubmit] = useState(false);

    const { user } = useContext(UserContext);

    function resetForm() {
        setStaff(null);
        setSubmit(false);
        setCcTo([]);
        setValues([]);
        setTemplate(null);
    }


    const error = {
        staffRequired: (staff == null),
        templateRequired: (template == null),
        valuesRequired: (values.length == 0)
    }



    function submitForm() {
        setSubmit(true);
        
        if(error.staffRequired || error.templateRequired || error.valuesRequired)
        {
            return;
        }

        const appreciationDTO = {
                userID : staff.userID,
                ccTo : ccTo.map((ccToitem) => ccToitem.userID),
                templateID : template.templateID+"",
                title : template.themeName,
                tags : values,
                recommendByID : user.userID
        }

        console.log(appreciationDTO);

        console.log(apiURL + 'api/appreciations',appreciationDTO);

        axios.post(apiURL + 'api/appreciations',appreciationDTO).then(
            (response) => 
            {
                console.log(response);
                alert("Appreciation Done Succesfully");
            }
        ).catch(
            (error) => 
            {
                alert("Something went Wrong");
            }
        );

        resetForm();
    }


    return (
        <RecommendErrorContext.Provider value={{isSubmit}}>
            <div className="recommendContainer">
                <Who staff={staff} setStaff={setStaff} ccTo={ccTo} setCcTo={setCcTo} error={error.staffRequired} />
                <TemplateList template={template} setTemplate={setTemplate} error={error.templateRequired} />
                <ValueList values={values} setValues={setValues} error={error.valuesRequired} />
                <div className="container submitContainer">
                    <div className="form-group">
                        <button className="btn btn-secondary" onClick={() => resetForm()}>
                            Reset
                        </button>
                        <button className="btn btn-primary" onClick={() => submitForm()}>
                            APPRECIATE
                        </button>
                    </div>
                </div>
            </div>
        </RecommendErrorContext.Provider>
    );
}

export default RecommendForm;