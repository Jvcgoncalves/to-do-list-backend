function getRegisterDate(dateToTransform = null){
  return dateToTransform === null ? new Date(Date.now()) : new Date(formatDateToISO(dateToTransform))
}

function formatDateToISO(dateString) {
  let dateComponents = dateString.split('/');
  let day = parseInt(dateComponents[0]);
  let month = parseInt(dateComponents[1]);
  let year = parseInt(dateComponents[2]);
  return `${year}/${month}/${day}`
}

module.exports = getRegisterDate