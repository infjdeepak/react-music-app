import { useSelector } from "react-redux";
//styled componets
import styled from "styled-components";
const Song = () => {
  const { currentSong } = useSelector((state) => state.songs);
  return (
    <SongStyles>
      <div className="song-cover">
        <img src={currentSong.cover} alt={currentSong.name} />
      </div>
      <div className="song-info">
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </SongStyles>
  );
};

//styles
const SongStyles = styled.div`
  text-align: center;
  .song-cover {
    img {
      border-radius: 50%;
      width: 30rem;
    }
  }
  .song-info {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export default Song;
