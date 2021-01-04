export const today = new Date().toISOString().substring(0, 10);
export const getFormatDate = date => {
  // formate Date to String(yyyy-mm-dd)
  if (!date) return null;
  const yyyy = date.getFullYear();
  let mm = 1 + date.getMonth();
  mm = mm >= 10 ? mm : '0' + mm;
  let dd = date.getDate();
  dd = dd >= 10 ? dd : '0' + dd;
  return yyyy + '-' + mm + '-' + dd;
};
export const strToDate = str => {
  // str = yyyy-mm-dd
  const yy = str.substring(0, 4);
  const mm = str.substring(5, 7);
  const dd = str.substring(8);
  return new Date(yy, mm - 1, dd);
};

// 헥스 컬러
export const getRandomHexColor = () => {
  const letters = '0123456789ABCDEF';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += letters[Math.floor(Math.random() * 16)];
  }
  return hex;
};
