import React from "react";
import { connect } from "react-redux";
import { getJokes } from "../../../redux/actions/jokesActions";
import JokeCategory from "./subcomponents/JokeCategory";
import Language from "./subcomponents/Language";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import AmountOfJokes from "./subcomponents/AmountOfJokes";

const Jokes = ({ getJokes, jokes: { jokesData, loading, error } }) => {
  const fetchJokes = () => {
    getJokes();
  };

  return (
    <>
      <h1>Jokes!</h1>
      <JokeCategory />
      <Language />
      <AmountOfJokes />

      <>
        {!loading && error && <p>{error}</p>}
        {loading && !error && <Spinner />}
        {!loading && !error && jokesData && !jokesData.jokes && (
          <>
            {jokesData.setup && jokesData.delivery && (
              <>
                <p>{jokesData.setup}</p>
                <p>{jokesData.delivery}</p>
              </>
            )}
            {jokesData.joke && <p>{jokesData.joke}</p>}
          </>
        )}
        {!loading && !error && jokesData && jokesData.jokes && jokesData.jokes.length > 0 && (
          <>
            {jokesData.jokes.map((joke) => (
              <>
                {joke.setup && joke.delivery && (
                  <div key={joke.id}>
                    <p>{joke.setup}</p>
                    <p>{joke.delivery}</p>
                  </div>
                )}
                {joke.joke && <p>{joke.joke}</p>}
              </>
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
