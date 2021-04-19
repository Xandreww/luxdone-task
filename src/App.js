import { Container, CssBaseline, Typography } from "@material-ui/core";
import "./App.scss";
import Landing from "./components/layout/landing/Landing";
import Navbar from "./components/layout/navbar/Navbar";

function App() {
  return (
    <>
      <CssBaseline />
      <Container className="root-container">
        <Typography component="div" className="container">
          <Navbar />
          <Container>
            <Landing />
          </Container>
        </Typography>
      </Container>
    </>
  );
}

export default App;
