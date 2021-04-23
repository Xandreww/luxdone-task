import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRandomJoke } from "../../../redux/actions/jokeActions";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";

const Landing = ({ getRandomJoke, joke: { joke, loading, error } }) => {
  useEffect(() => {
    if (!joke || (joke && !joke.id)) {
      getRandomJoke();
    }
  }, [getRandomJoke, joke]);

  return (
    <>
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && (
        <>
          <h1>Trending</h1>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
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
