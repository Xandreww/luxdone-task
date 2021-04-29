import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRandomJoke } from "../../../redux/actions/jokeActions";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import styles from "./Landing.module.scss";

const Landing = ({ getRandomJoke, joke: { joke, loading, error } }) => {
  useEffect(() => {
    if (!joke || (joke && !joke.id)) {
      getRandomJoke();
    }
  }, [getRandomJoke, joke]);

  const copyJokeToClipboard = () => {
    navigator.clipboard.writeText(joke.setup + "\n" + joke.punchline);
  };

  return (
    <>
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && joke && (
        <>
          <h1>Trending</h1>
          <div className={styles.joke} onClick={copyJokeToClipboard}>
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
          </div>
          <button onClick={() => getRandomJoke()}>Gimme another joke!</button>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  joke: state.joke,
});

Landing.propTypes = {
  getRandomJoke: PropTypes.func.isRequired,
  joke: PropTypes.object,
};

export default connect(mapStateToProps, { getRandomJoke })(Landing);
