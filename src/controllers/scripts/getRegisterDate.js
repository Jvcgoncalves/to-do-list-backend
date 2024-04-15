function getRegisterDate(){
  const currentDate = Date.now()
  let dateFormat = new Date(currentDate)
  const year = dateFormat.getFullYear().toString();
  const month = dateFormat.getMonth().toString();
  const day = dateFormat.getDate().toString();

  return `${day.length === 1 ? `0${day}` : day}/${month.length === 1 ? `0${month}` : month}/${year}`
}

module.exports = getRegisterDate