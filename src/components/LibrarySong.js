// import { PlaySong } from "../utils";
const LibrarySong = ({
  song,
  setCurrentSong,
  isPlaying,
  audioRef,
  songs,
  setSongs,
  id,
}) => {
  const selectSongHandler = async () => {
    await setCurrentSong(song);

    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });

    setSongs(newSongs);
    //check if current song is playing
    if (isPlaying) {
      audioRef.current.play();
    }
    // PlaySong(isPlaying, audioRef);
  };

  return (
    <div
      onClick={selectSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="" />
      <div className="song-des">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
