import React from "react";
import { connect } from "react-redux";
import { getJokes } from "../../../redux/actions/jokesActions";
import { Button, Container } from "@material-ui/core";
import JokeCategory from "./subcomponents/JokeCategory";
import Language from "./subcomponents/Language";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import AmountOfJokes from "./subcomponents/AmountOfJokes";
import BlacklistCategory from "./subcomponents/BlacklistCategory";
import styles from "./Jokes.module.scss";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const Jokes = ({ getJokes, jokes: { jokesData, loading, error } }) => {
  const copyJokeToClipboard = (joke) => {
    const { setup, delivery } = joke;

    if (setup && delivery) {
      navigator.clipboard.writeText(setup + "\n" + delivery);
    } else {
      navigator.clipboard.writeText(joke.joke);
    }
  };

  return (
    <Container className="jokes">
      <h1>Random jokes!</h1>
      <p>Here, you can search for random jokes and apply filters for specyfic results (optional)</p>
      <div className={styles.settings}>
        <div className={styles.categories}>
          <JokeCategory />
          <BlacklistCategory />
        </div>
        <div className={styles.rightSideDropdowns}>
          <div className={styles.jokeLanguage}>
            <Language />
          </div>
          <AmountOfJokes />
        </div>
      </div>

      <>
        {!loading && error && <p>{error}</p>}
        {loading && !error && <Spinner />}
        {!loading && !error && jokesData && !jokesData.jokes && (
          <>
            {jokesData.setup && jokesData.delivery && (
              <div className="joke" onClick={copyJokeToClipboard(jokesData)}>
                <p>{jokesData.setup}</p>
                <p>{jokesData.delivery}</p>
              </div>
            )}
            {jokesData.joke && (
              <p className="joke" onClick={copyJokeToClipboard(jokesData)}>
                {jokesData.joke}
              </p>
            )}
          </>
        )}
        {!loading && !error && jokesData && jokesData.jokes && jokesData.jokes.length > 0 && (
          <>
            {jokesData.jokes.map((joke) => (
              <div className="joke">
                {joke.setup && joke.delivery && (
                  <div key={joke.id} onClick={copyJokeToClipboard(joke)}>
                    <p>{joke.setup}</p>
                    <p>{joke.delivery}</p>
                  </div>
                )}
                {joke.joke && (
                  <div>
                    <p>{joke.joke}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </>

      <Button onClick={() => getJokes()} variant="contained" color="primary" className={styles.fetchJokes}>
        <SentimentVerySatisfiedIcon className={styles.icon} />
        Fetch jokes
      </Button>
    </Container>
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
