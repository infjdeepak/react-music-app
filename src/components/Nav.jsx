import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { toggleLibrary } from "../redux/slices/toggleSlice";
import { useDispatch } from "react-redux";
const Nav = () => {
  const dispatch = useDispatch();
  return (
    <NavStyle>
      <div className="logo">
        <a href="/">ChillMusic</a>
      </div>
      <button className="library-btn" onClick={() => dispatch(toggleLibrary())}>
        <FontAwesomeIcon icon={faMusic} /> Library
      </button>
    </NavStyle>
  );
};

//styled component
const NavStyle = styled.div`
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 10vh;
  min-height: 10svh;
  .logo {
    a {
      font-weight: bold;
      color: black;
      font-size: 2.5rem;
    }
  }
  .library-btn {
    z-index: 10;
    padding: 1rem 3rem;
    border: 1px solid rgb(48, 47, 47);
    background: none;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    &:hover {
      background: rgb(48, 47, 47);
      color: whitesmoke;
    }
  }
`;
export default Nav;
