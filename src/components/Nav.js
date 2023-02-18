import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
const Nav = ({ isLibraryActive, setIsLibraryActive }) => {
  return (
    <nav>
      <div className="logo">
        <a href="/">ChillMusic</a>
      </div>
      <button
        className="library-btn"
        onClick={() =>
          isLibraryActive
            ? setIsLibraryActive(!isLibraryActive)
            : setIsLibraryActive(!isLibraryActive)
        }
      >
        <FontAwesomeIcon icon={faMusic} /> Library
      </button>
    </nav>
  );
};

export default Nav;
