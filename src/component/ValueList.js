import "./ValueList.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../config";
import { RecommendErrorContext } from "../page/RecommendForm";

function ValueList({ values, setValues , error }) {
    const [tagList, setTagList] = useState([]);
    const { isSubmit } = useContext(RecommendErrorContext);

    useEffect(() => {
        axios.get(apiURL + "api/templates").then(
            (response) => {
                let tempTags = [];
                response.data.forEach(template => {
                    template.themeTags.forEach((tag,index) => {
                        tempTags.push({
                            localID:("tag"+template.templateID + "_" + index),
                            tagValue:tag,
                            selected:false
                        });
                    });
                });
                // console.log(typeof tempTags);
                
                setTagList(tempTags);
            }
        );


    }, []);

    const renderTagList = tagList.map(
        (tag) => {

            let extraClassName = "";
            if((values.length > 0) && tag.selected)
            {
                extraClassName = " selectedTag";
            }

            return (
                <label className={"tag" + extraClassName} onClick={()=> toggleTag(tag)} key={tag.localID}>
                    {tag.tagValue}
                </label>
            );
        }
    );

    function toggleTag(tag)
    {
        if(values.length == 0)
        {
            tagList.forEach(tag => {
                tag.selected = false;
            });
        }

        let tempValues = [];
        let tempTagList = tagList.map(
            (tagItem) => 
            {
                if(tagItem.localID == tag.localID)
                {
                    tagItem.selected = !tagItem.selected;
                }

                if(tagItem.selected)
                {
                    tempValues.push(tagItem.tagValue);
                }

                return tagItem;
            }
        );

        setTagList(tempTagList);
        setValues(tempValues);
    }

    return (
        <div className="container tagContainer">
            <div className="form-group">
                <label>
                    Select Tag(s)
                </label>
                {
                    (isSubmit && error)
                    &&
                    <small className="error">
                        <br />
                        Please select atleast one tag
                    </small>
                }
                <div className="tagListContainer">
                    {renderTagList}
                </div>
            </div>
        </div>
    );
}

export default ValueList;