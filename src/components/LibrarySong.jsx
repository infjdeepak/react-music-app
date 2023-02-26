//styled component
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
import { changeSong, addActiveToSong } from "../redux/slices/songsSlice";

const LibrarySong = ({ song, audioRef }) => {
  const dispatch = useDispatch();
  //state
  const { songs } = useSelector((state) => state.songs);
  const { isPlaying } = useSelector((state) => state.songInfo);
  //handler
  const selectSongHandler = async () => {
    dispatch(changeSong(song));
    //add active state
    const newSongs = songs.map((stateSong) => {
      if (stateSong.id === song.id) {
        return { ...stateSong, active: true };
      } else {
        return { ...stateSong, active: false };
      }
    });

    dispatch(addActiveToSong(newSongs));
    if (isPlaying) {
      await audioRef.current.pause();
      audioRef.current.play();
    }
  };

  return (
    <SongStyle
      onClick={selectSongHandler}
      className={song.active ? "selected" : ""}
    >
      <div className="song-icon">
        <img src={song.cover} alt={song.name} />
      </div>
      <div className="song-info">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </SongStyle>
  );
};

//styles
const SongStyle = styled.div`
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    max-width: 10rem;
    object-fit: cover;
  }
  &:hover {
    background: rgb(222, 222, 240);
  }
  .song-info {
    padding-left: 2rem;
    h3 {
      padding: 1rem 0;
    }
    h4 {
      font-size: 1.8rem;
    }
  }
`;
export default LibrarySong;
