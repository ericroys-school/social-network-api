/**
 * Formats a date into MM/DD/YYYY
 * @param {date} d 
 * @returns 
 */
export const formatDate = (d) => {
    return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
}