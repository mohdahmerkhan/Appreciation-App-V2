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
