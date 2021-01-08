export const publicUrl = process.env.PUBLIC_URL;

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
  this.title = '';

  this.setCurTime = curTime => {
    this.player.currentTime = curTime;
  };

  // 재생정보 설정
  this.setCurrentSong = (idx, curTime) => {
    this.idx = idx;
    this.title = this.playlists[idx].dataset.title;
    this.player.src = `${publicUrl}/resources/audio/${this.title}.mp3`;
    this.setCurTime(curTime);
  };
}
