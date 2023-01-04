export const dateFormat = (dateString) => {

    const dateElement = dateString.split("T")[0].split("-");

    let formattedDate = dateElement[2] + "-";

    switch (dateElement[1]) {
        case "01":
            formattedDate += "Jan-";
            break;
        case "02":
            formattedDate += "Feb-";
            break;
        case "03":
            formattedDate += "Mar-";
            break;
        case "04":
            formattedDate += "Apr-";
            break;
        case "05":
            formattedDate += "May-";
            break;
        case "06":
            formattedDate += "Jun-";
            break;
        case "07":
            formattedDate += "Jul-";
            break;
        case "08":
            formattedDate += "Aug-";
            break;
        case "09":
            formattedDate += "Sep-";
            break;
        case "10":
            formattedDate += "Oct-";
            break;
        case "11":
            formattedDate += "Nov-";
            break;
        case "12":
            formattedDate += "Dec-";
            break;
    }

    formattedDate += dateElement[0];

    return formattedDate;
}


export function findTimeAgo(createdDate) {
    let currentDate = Date.now();
    let dateDiff = currentDate - Date.parse(createdDate);
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    //Considering 
    // 1 Month = 30 Days
    const month = 30 * day;
    const year = 12 * month;

    if (dateDiff > year) {
        let ratio = parseInt(dateDiff / year);

        if (ratio > 1) {
            return ratio + " yrs ago";
        }
        else {
            return "1 yr ago";
        }
    }
    else if (dateDiff > month) {
        let ratio = parseInt(dateDiff / month);
        if (ratio > 1) {
            return ratio + " months ago";
        }
        else {
            return "1 month ago";
        }
    }
    else if (dateDiff > week) {
        let ratio = parseInt(dateDiff / week);
        if (ratio > 1) {
            return ratio + " weeks ago";
        }
        else {
            return "1 week ago";
        }
    }
    else if (dateDiff > day) {
        let ratio = parseInt(dateDiff / day);
        if (ratio > 1) {
            return ratio + " days ago";
        }
        else {
            return "1 day ago";
        }
    }
    else if (dateDiff > hour) {
        let ratio = parseInt(dateDiff / hour);
        if (ratio > 1) {
            return ratio + " hours ago";
        }
        else {
            return "1 hour ago";
        }
    }
    else if (dateDiff > minute) {
        let ratio = parseInt(dateDiff / minute);
        if (ratio > 1) {
            return ratio + " mins ago";
        }
        else {
            return "1 min ago";
        }
    }
    else if (dateDiff > second) {

        let ratio = parseInt(dateDiff / second);
        if (ratio > 1) {
            return ratio + " seconds ago";
        }
        else {
            return "1 second ago";
        }
    }
}
