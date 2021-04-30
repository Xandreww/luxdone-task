import axios from "axios";

import { GET_RANDOM_JOKE, JOKE_LOADING, JOKE_ERROR, GET_JOKES } from "./types";

export const getRandomJoke = () => async (dispatch) => {
  try {
    dispatch({
      type: JOKE_LOADING,
    });
    const res = await axios.get("https://official-joke-api.appspot.com/random_joke");

    dispatch({
      type: GET_RANDOM_JOKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOKE_ERROR,
      payload: "An error occurred... It's not a joke!",
    });
  }
};

export const getJokes = () => async (dispatch, getState) => {
  // const { jokes } = getState;
  const state = getState();
  console.log("state:", state);

  try {
    dispatch({
      type: JOKE_LOADING,
    });
    const res = await axios.get("https://v2.jokeapi.dev/joke/Any", {
      params: {
        amount: 2,
      },
    });

    dispatch({
      type: GET_JOKES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOKE_ERROR,
      payload: "An error occurred... It's not a joke!",
    });
  }
};
