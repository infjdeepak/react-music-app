import Song from "../components/Song";
import Player from "../components/Player";
import Library from "../components/Library";
//styled components
import styled from "styled-components";
//redux
import { useSelector, useDispatch } from "react-redux";
import { updateTime } from "../redux/slices/songInfoSlice";
import { changeSong, addActiveToSong } from "../redux/slices/songsSlice";
//useRef
import { useRef } from "react";
const Home = () => {
  const dispatch = useDispatch();
  const { currentSong, songs } = useSelector((state) => state.songs);
  const { isPlaying } = useSelector((state) => state.songInfo);
  const audioRef = useRef();
  //handler
  const timeUpdateHandler = (e) => {
    //calculate percentage
    const roundedCurrent = Math.round(audioRef.current.currentTime);
    const roundedDuration = Math.round(audioRef.current.duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    dispatch(
      updateTime({
        currentTime: audioRef.current.currentTime,
        duration: audioRef.current.duration,
        percentage: percentage,
      })
    );
  };
  const nextSongHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    dispatch(changeSong(songs[(currentIndex + 1) % songs.length]));

    //add active to song
    (function addActive(nextPrev) {
      const nextSong = songs[(currentIndex + 1) % songs.length];
      const newSongs = songs.map((stateSong) => {
        if (stateSong.id === nextSong.id) {
          return { ...stateSong, active: true };
        } else {
          return { ...stateSong, active: false };
        }
      });
      dispatch(addActiveToSong(newSongs));
    })();
    //if song is playing
    if (isPlaying) {
      await audioRef.current.pause();
      audioRef.current.play();
    }
  };

  return (
    <Wrapper>
      <Song />
      <Player audioRef={audioRef} />
      <Library audioRef={audioRef} />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={nextSongHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </Wrapper>
  );
};
//styles
const Wrapper = styled.section`
  padding: 2rem 5%;
  min-height: 90vh;
  min-height: 90svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  @media screen and (max-width: 700px) {
    gap: 5rem;
  }
`;
export default Home;
