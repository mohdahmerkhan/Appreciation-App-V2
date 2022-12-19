import "./TemplateList.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../config";
import Template_1 from "../images/Template_1.bmp";
import Template_2 from "../images/Template_2.bmp";
import Template_3 from "../images/Template_3.bmp";
import { RecommendErrorContext } from "../page/RecommendForm";

function TemplateList({ template, setTemplate, error }) {

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

            let whichTemplate;
            switch (templateItem.templateID) {
                case 1:
                    whichTemplate = Template_1;
                    break;
                case 2:
                    whichTemplate = Template_2;
                    break;
                case 3:
                    whichTemplate = Template_3;
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