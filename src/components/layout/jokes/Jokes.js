import React from "react";
import { connect } from "react-redux";
import { getJokes } from "../../../redux/actions/jokesActions";
import JokeCategory from "./subcomponents/JokeCategory";
import Language from "./subcomponents/Language";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";

const Jokes = ({ getJokes, jokes: { jokesData, loading, error } }) => {
  const fetchJokes = () => {
    getJokes();
  };

  return (
    <>
      <h1>Jokes!</h1>
      <JokeCategory />
      <Language />

      <>
        {!loading && error && <p>{error}</p>}
        {loading && !error && <Spinner />}
        {!loading && !error && jokesData && jokesData.jokes.length > 0 && (
          <>
            {jokesData.jokes.map((joke) => (
              <div key={joke.id}>
                <p>{joke.setup}</p>
                <p>{joke.delivery}</p>
              </div>
            ))}
          </>
        )}
      </>

      <button onClick={fetchJokes}>Fetch jokes</button>
    </>
  );
};

const mapStateToProps = (state) => ({
  jokes: state.jokes,
});

Jokes.propTypes = {
  getJokes: PropTypes.func.isRequired,
  jokes: PropTypes.object,
};

export default connect(mapStateToProps, { getJokes })(Jokes);
