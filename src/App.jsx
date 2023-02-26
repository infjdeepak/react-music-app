//styled components and global styles
import GlobalStyles from "./components/GlobalStyles";
//components
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Home />
    </>
  );
}

export default App;
