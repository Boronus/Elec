export function compareTimeStamp(a,b) {
    if (a.timestamp < b.timestamp)
        return -1;
    if (a.timestamp > b.timestamp)
        return 1;
    return 0;
}

export function compareCategory(a,b) {
    return a.category.localeCompare( b.category );
}

export function compareFileSize(a,b) {
    if (a.filesize < b.filesize)
        return -1;
    if (a.filesize > b.filesize)
        return 1;
    return 0;
}

export function compareFileName(a,b) {
    return a.name.localeCompare( b.name );
}