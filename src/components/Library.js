import LibrarySong from "./LibrarySong";
const Library = ({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
  isLibraryActive,
}) => {
  return (
    <div className={`library ${isLibraryActive ? "active" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            key={song.id}
            id={song.id}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            audioRef={audioRef}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
