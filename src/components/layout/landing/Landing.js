import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRandomJoke } from "../../../redux/actions/jokesActions";
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
    <>
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && randomJoke && (
        <>
          <h1>Trending</h1>
          <div className={styles.randomJoke} onClick={copyJokeToClipboard}>
            <p>{randomJoke.setup}</p>
            <p>{randomJoke.punchline}</p>
          </div>
          <button onClick={() => getRandomJoke()}>Gimme another randomJoke!</button>
        </>
      )}
    </>
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
