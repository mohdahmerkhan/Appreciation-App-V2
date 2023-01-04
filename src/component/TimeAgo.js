import { useEffect, useState } from "react";
import { findTimeAgo } from "./Utility/Utility";

function TimeAgo({ createdDate }) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    //Considering 
    // 1 MONTH = 30 DAYs
    const MONTH = 30 * DAY;
    const YEAR = 12 * MONTH;

    const [timeDiff, setTimeDiff] = useState(Date.now() - Date.parse(createdDate));

    useEffect(() => {
        if (timeDiff > YEAR) {
            setCustomTimeOut(YEAR);
        }
        else if (timeDiff > MONTH) {
            setCustomTimeOut(MONTH);
        }
        else if (timeDiff > WEEK) {
            setCustomTimeOut(WEEK);
        }
        else if (timeDiff > DAY) {
            setCustomTimeOut(DAY);
        }
        else if (timeDiff > HOUR) {
            setCustomTimeOut(HOUR);
        }
        else if (timeDiff > MINUTE) {
            setCustomTimeOut(MINUTE);
        }
        else if (timeDiff > SECOND) {
            setCustomTimeOut(SECOND);
        }

    }, [timeDiff]);

    function setCustomTimeOut(timeUnit) {
        setTimeout(() => {
            // console.log("------   " + new Date() + "   ------");
            let timeUnitString = "";

            switch (timeUnit) {
                case SECOND:
                    timeUnitString = "Second";
                    break;

                case MINUTE:
                    timeUnitString = "Minute";
                    break;

                case HOUR:
                    timeUnitString = "Hour";
                    break;

                case DAY:
                    timeUnitString = "Day";
                    break;

                case WEEK:
                    timeUnitString = "Week";
                    break;

                case MONTH:
                    timeUnitString = "Month";
                    break;

                case YEAR:
                    timeUnitString = "Year";
                    break;

            }
            // console.log(timeUnitString + " Changes");
            setTimeDiff(timeUnit * (parseInt(timeDiff / timeUnit) + 1));
        }, timeUnit - (timeDiff % timeUnit));
    }

    return findTimeAgo(createdDate);
}

export default TimeAgo;