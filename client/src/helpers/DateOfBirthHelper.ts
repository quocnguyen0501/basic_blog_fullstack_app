export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 === 0) || year % 400 === 0;
};

export const daysOfFeb = (year: number): number => {
    return isLeapYear(year) ? 29 : 28;
};

export const getDays = (): number[] => {
    let option: number[] = [];
    for (let i = 1; i < 32; i++) {
        option = [...option, i];
    }
    return option;
};

export const getMonthName = (month: number): string => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString("default", {
        month: "short",
    });
};

export const getMonths = (): string[] => {
    let option: string[] = [];
    for (let i = 0; i < 12; i++) {
        option = [...option, getMonthName(i)];
    }
    return option;
};

export const getYears = (): number[] => {
    let d = new Date();
    let option: number[] = [];
    for (let i = d.getFullYear() - 150; i <= d.getFullYear(); i++) {
        // years start i
        option = [...option, i];
    }
    return option;
};

export const handleSelectYear = (
    year: number,
    month: number,
    day: number
): number[] => {
    const daysFeb: number = daysOfFeb(year);
    if (isLeapYear(year) && month === 2 && day > daysFeb) {
        day = daysFeb;
    }

    return [31, daysFeb, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};