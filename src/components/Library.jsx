import LibrarySong from "./LibrarySong";
import { useSelector } from "react-redux";
//styled component
import styled from "styled-components";
const Library = ({ audioRef }) => {
  const { songs } = useSelector((state) => state.songs);
  const { isLibraryActive } = useSelector((state) => state.toggles);

  return (
    <Wrapper style={isLibraryActive ? { transform: "translateX(0%)" } : {}}>
      <h2>Library</h2>
      <div className="songs-list">
        {songs.map((song) => (
          <LibrarySong song={song} key={song.id} audioRef={audioRef} />
        ))}
      </div>
    </Wrapper>
  );
};

//styles
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40rem;
  height: 100%;
  overflow-y: scroll;
  box-shadow: 2px 2px 50px rgb(202, 197, 197);
  background: white;
  overflow: scroll;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  h2 {
    padding: 3rem;
  }
  .selected {
    background: rgb(161, 181, 228);
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
export default Library;
