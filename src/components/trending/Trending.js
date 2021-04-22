import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRandomJoke } from "../../redux/actions/jokeActions";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";

const Trending = ({ getRandomJoke, joke: { joke, loading, error } }) => {
  useEffect(() => {
    getRandomJoke();
  }, [getRandomJoke]);

  return (
    <>
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && (
        <>
          <h1>Trending</h1>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  joke: state.joke,
});

Trending.propTypes = {
  getRandomJoke: PropTypes.func.isRequired,
  joke: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getRandomJoke })(Trending);
