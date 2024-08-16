/**
 * Formats a date into MM/DD/YYYY
 * @param {createdAt} d
 * @returns
 */
export function formatDate(createdAt) {
  const d = new Date(createdAt);
  return `${pad(d.getMonth())}/${pad(d.getDay())}/${d.getFullYear()}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

//make sure segment has 2 chars or it just looks silly :-)
const pad= (num)=>{
    return num.toString().padStart(2,"0");
}