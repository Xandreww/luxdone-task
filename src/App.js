import { Container, CssBaseline, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Landing from "./components/layout/landing/Landing";
import Navbar from "./components/layout/navbar/Navbar";
import Search from "./components/search/Search";
import Trending from "./components/trending/Trending";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container className="root-container">
        <Typography component="div" className="container">
          <Navbar />
          <Container>
            <Route exact path="/" component={Landing} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path="/search" component={Search} />
          </Container>
        </Typography>
      </Container>
    </Router>
  );
}

export default App;
