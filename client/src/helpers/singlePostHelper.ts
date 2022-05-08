import moment from "moment";

export const setTimeIntervalCreatedAtDisplay = (createdAt: Date) => {
    const timeDisplay = moment(createdAt).fromNow();

    const arr = timeDisplay
        .split(" ")
        .filter(
            (value: string) =>
                value === "year" ||
                value === "years" ||
                value === "month" ||
                value === "months" ||
                value === "days" ||
                value === "day" ||
                value === "hours" ||
                value === "hour" ||
                value === "minutes" ||
                value === "minute" ||
                value === "seconds"
        );
};
