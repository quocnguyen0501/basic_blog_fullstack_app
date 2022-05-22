const locate = (str: string, character: string) => {
    const indexes = [];

    for (let index = 0; index < str.length; index++) {
        if (str[index] === character) {
            indexes.push(index);
        }
    }

    return indexes;
};

export const getMigrationsURL = (dirname: string) => {
    const location = locate(dirname, "/");

    return dirname.slice(0, location[location.length - 2]);
};
