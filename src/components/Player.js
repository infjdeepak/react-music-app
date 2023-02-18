import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  //event handling
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    //calculate percentage
    const roundedCurrent = Math.round(e.target.value);
    const roundedDuration = Math.round(audioRef.current.duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
      animationPercent: percentage,
    });
  };
  const skipSongHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        addActiveToSong(songs[songs.length - 1]);
        if (isPlaying) {
          audioRef.current.play();
        }
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      addActiveToSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      addActiveToSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  //function
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const addActiveToSong = (nextPrev) => {
    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  };
  //style for animation

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[0]})`,
          }}
        >
          <input
            type="range"
            onChange={dragHandler}
            min={0}
            value={songInfo.currentTime}
            max={songInfo.duration || 0}
          />
          <div
            className="track-animation"
            style={{ transform: `translateX(${songInfo.animationPercent}%)` }}
          ></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipSongHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={() => skipSongHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="3x"
        />
      </div>
    </div>
  );
};

export default Player;
