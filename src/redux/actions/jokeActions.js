import axios from "axios";

import { GET_RANDOM_JOKE, JOKE_LOADING, JOKE_ERROR } from "./types";

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
