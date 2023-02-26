import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
//styled components
import styled from "styled-components";
//redux
import { useSelector, useDispatch } from "react-redux";
import { updateIsPlaying, updateTime } from "../redux/slices/songInfoSlice";
import { changeSong, addActiveToSong } from "../redux/slices/songsSlice";

const Player = ({ audioRef }) => {
  const dispatch = useDispatch();
  //states
  const { currentSong, songs } = useSelector((state) => state.songs);
  const { isPlaying, songTimeInfo } = useSelector((state) => state.songInfo);
  const { currentTime, duration, percentage } = songTimeInfo;
  //handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(updateIsPlaying());
  };

  const changeSongHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "previos") {
      if ((currentIndex - 1) % songs.length === -1) {
        dispatch(changeSong(songs[songs.length - 1]));
        addActive(songs[songs.length - 1]);
        //if song is playing
        if (isPlaying) {
          await audioRef.current.pause();
          audioRef.current.play();
        }
        return;
      }
      dispatch(changeSong(songs[(currentIndex - 1) % songs.length]));
      addActive(songs[(currentIndex - 1) % songs.length]);
    }

    if (direction === "next") {
      dispatch(changeSong(songs[(currentIndex + 1) % songs.length]));
      addActive(songs[(currentIndex + 1) % songs.length]);
    }

    //if song is playing
    if (isPlaying) {
      await audioRef.current.pause();
      audioRef.current.play();
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    //calculate percentage
    const roundedCurrent = Math.round(audioRef.current.currentTime);
    const roundedDuration = Math.round(audioRef.current.duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    dispatch(
      updateTime({
        currentTime: e.target.value,
        duration: duration,
        percentage,
      })
    );
  };
  //functions
  function convertStoMs(seconds) {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return minutes + ":" + extraSeconds;
  }
  function addActive(nextPrev) {
    const newSongs = songs.map((stateSong) => {
      if (stateSong.id === nextPrev.id) {
        return { ...stateSong, active: true };
      } else {
        return { ...stateSong, active: false };
      }
    });
    dispatch(addActiveToSong(newSongs));
  }
  return (
    <Wrapper>
      <div className="input-track">
        <p>{convertStoMs(Math.floor(currentTime))}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            value={currentTime}
            max={duration ? duration : 0}
            onChange={dragHandler}
          />
          <div
            className="track-animation"
            style={{ transform: `translateX(${percentage}%)` }}
          ></div>
        </div>
        <p>{duration ? convertStoMs(Math.floor(duration)) : "00:00"}</p>
      </div>
      <div className="controls">
        <FontAwesomeIcon
          onClick={() => changeSongHandler("previos")}
          icon={faAngleLeft}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={() => changeSongHandler("next")}
          icon={faAngleRight}
          size="3x"
        />
      </div>
    </Wrapper>
  );
};
//styles
const Wrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  .input-track {
    display: flex;
    gap: 1rem;
    input {
      width: 50rem;
    }
    @media screen and (max-width: 700px) {
      input {
        width: 30rem;
      }
    }
  }

  .track {
    width: 100%;
    overflow: hidden;
    border-radius: 2rem;
    position: relative;
  }
  .track-animation {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(201, 200, 200);
    pointer-events: none;
  }
  input[type="range"] {
    appearance: none;
    height: 2rem;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 0px;
    height: 0px;
    border: none;
  }
  input[type="range"]::-moz-range-thumb {
    appearance: none;
    width: 0px;
    height: 0px;
    border: none;
  }

  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  .controls {
    width: 30rem;
    display: flex;
    justify-content: space-between;
    svg {
      cursor: pointer;
    }
    @media screen and (max-width: 700px) {
      gap: 3rem;
    }
  }
`;
export default Player;
