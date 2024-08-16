/**
 * Formats a date into MM/DD/YYYY
 * @param {createdAt} d 
 * @returns 
 */
export function formatDate(createdAt) {
    const d = new Date(createdAt);
    return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
}