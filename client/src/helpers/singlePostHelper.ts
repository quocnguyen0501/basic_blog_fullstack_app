import moment from "moment";

export const setTimeIntervalCreatedAtDisplay = (createdAt: Date): number | null => {
    const timeDisplay = moment(createdAt).fromNow();

    const arr = timeDisplay
        .split(" ")
        .filter(
            (value: string) =>
                value === "hours" ||
                value === "hour" ||
                value === "minutes" ||
                value === "minute" ||
                value === "seconds"
        );

    if (arr.length === 0) {
        return null;
    } else {
        if (
            arr[0] === "seconds" ||
            arr[0] === "minute" ||
            arr[0] === "minutes"
        ) {
            const ONE_MINUTE = 60 * 1000;
            return ONE_MINUTE;
        } else {
            const ONE_HOUR = 60 * 60 * 1000
            return ONE_HOUR;
        }
    }
};
