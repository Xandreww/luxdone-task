import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRandomJoke } from "../../../redux/actions/jokesActions";
import { Button, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import styles from "./Landing.module.scss";

const Landing = ({ getRandomJoke, jokes: { randomJoke, loading, error } }) => {
  useEffect(() => {
    if (!randomJoke || (randomJoke && !randomJoke.id)) {
      getRandomJoke();
    }
  }, [getRandomJoke, randomJoke]);

  const copyJokeToClipboard = () => {
    navigator.clipboard.writeText(randomJoke.setup + "\n" + randomJoke.punchline);
  };

  return (
    <Container>
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && randomJoke && (
        <>
          <h1>
            Welcome to <span className="rainbowText">FunSite!</span>
          </h1>

          <p>To have fun, you can:</p>
          <ul>
            <li>check out trending GIF's</li>
            <li>search for GIF's</li>
            <li>search for random jokes</li>
          </ul>

          <p>
            Any GIF you like? <span className="bold">Click</span> on one to <span className="bold">see details</span>
          </p>
          <p>
            Any joke you like? <span className="bold">Click</span> on in to{" "}
            <span className="bold">copy text to clipboard</span>
          </p>

          <div className="joke" onClick={copyJokeToClipboard}>
            <p>{randomJoke.setup}</p>
            <p>{randomJoke.punchline}</p>
          </div>
          <Button onClick={() => getRandomJoke()} variant="contained" color="primary" className={styles.button}>
            Gimme another random joke!
          </Button>

          <p>This page uses:</p>
          <ul>
            <li>
              <a href="https://developers.giphy.com/" target="blank" alt="Gipyhy API">
                Giphy API
              </a>
            </li>
            <li>
              <a href="https://github.com/15Dkatz/official_joke_api" target="blank" alt="official joke api">
                official_joke_api
              </a>
            </li>
            <li>
              <a href="https://sv443.net/jokeapi/v2/" target="blank" alt="official joke api">
                JokeAPI
              </a>
            </li>
          </ul>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  jokes: state.jokes,
});

Landing.propTypes = {
  getRandomJoke: PropTypes.func.isRequired,
  jokes: PropTypes.object,
};

export default connect(mapStateToProps, { getRandomJoke })(Landing);
