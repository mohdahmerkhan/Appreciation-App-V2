import "./TemplateList.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../config";
import { RecommendErrorContext } from "../page/RecommendForm";

function TemplateList({ template, setTemplate, error }) {

    // console.log("TemplateList");
    const [templateList, setTemplateList] = useState([]);
    const { isSubmit } = useContext(RecommendErrorContext);

    useEffect(() => {
        axios.get(apiURL + "api/templates").then(
            (response) => {
                setTemplateList(response.data);
            }
        );


    }, []);

    const renderTemplates = templateList.map(
        (templateItem) => {

            let whichTemplate = apiURL;
            switch (templateItem.templateID) {
                case 1:
                    whichTemplate += "images/templateImages/Template_1.bmp";
                    break;
                case 2:
                    whichTemplate += "images/templateImages/Template_2.bmp";
                    break;
                case 3:
                    whichTemplate += "images/templateImages/Template_3.bmp";
                    break;
            }

            const extraClassName = (template && template.templateID == templateItem.templateID)?"selectedTemplate":"";
            return (
                <div className={"template " + extraClassName} key={templateItem.templateID} onClick={() => setTemplate(templateItem)}>
                    <img src={whichTemplate} alt="Image" />
                    <span className="tempTitle">
                        {templateItem.themeName}
                    </span>
                </div>
            );
        }
    );

    return (
        <div className="container templateContainer">
            <div className="form-group">
                <label>
                    Choose a template
                </label>
                {
                    (isSubmit && error)
                    &&
                    <small className="error">
                        <br/>
                        Please select any template
                    </small>
                }
                <div className="templateListContainer">
                    {renderTemplates}
                </div>
            </div>
        </div>
    );
}

export default TemplateList;