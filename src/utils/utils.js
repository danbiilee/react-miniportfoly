export const publicUrl = process.env.PUBLIC_URL;

// 날짜
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

// 오디오 플레이어
export function Audio(player, playlists) {
  this.player = player;
  this.playlists = playlists;

  this.idx = 0;
  this.title = this.playlists[this.idx].dataset.title;
  this.player.src = `${publicUrl}/resources/audio/${this.title}.mp3`;

  this.setCurrentSong = idx => {
    this.idx = idx;
    this.title = this.playlists[idx].dataset.title;
    this.player.src = `${publicUrl}/resources/audio/${this.title}.mp3`;
  };

  this.play = curTime => {
    this.player.currentTime = curTime;
    const startPlay = this.player.play();
    return startPlay;
  };
}
