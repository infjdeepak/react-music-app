import { useState, useRef } from "react";
import "./styles/app.scss";
import Nav from "./components/Nav";
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data";
import Library from "./components/Library";

const App = () => {
  //ref
  const audioRef = useRef(null);
  // states
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercent: 0,
  });
  const [isLibraryActive, setIsLibraryActive] = useState(false);
  //event handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercent: percentage,
    });
  };
  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    setIsPlaying(false);
  };
  return (
    <>
      <Nav
        isLibraryActive={isLibraryActive}
        setIsLibraryActive={setIsLibraryActive}
      />
      <section className={`music-player ${isLibraryActive ? "active" : ""}`}>
        <Song currentSong={currentSong} />
        <Player
          currentSong={currentSong}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          audioRef={audioRef}
          setSongs={setSongs}
          isLibraryActive={isLibraryActive}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          onEnded={songEndHandler}
          ref={audioRef}
          src={currentSong.audio}
        ></audio>
      </section>
    </>
  );
};

export default App;
