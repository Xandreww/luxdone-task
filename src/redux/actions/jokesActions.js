import axios from "axios";

import { GET_RANDOM_JOKE, JOKE_LOADING, JOKE_ERROR, GET_JOKES, SET_JOKES_AMOUNT } from "./types";

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
  let categories = "Any";
  const params = {};
  const categoryArray = [];
  const state = getState();
  const jokesParams = state.jokes.jokesParams;

  const setCategory = (object) => {
    for (let o in object) {
      if (object[o]) {
        categoryArray.push(o);
      }
    }
    if (categoryArray.length > 0) {
      categories = categoryArray.join(",");
    }
  };

  const setAmount = (amount) => {
    if (amount > 1) {
      params.amount = amount;
    }
  };

  setAmount(jokesParams.amount);
  setCategory(jokesParams.category);

  // const isTrue = object => {
  //   for (let o in object) {
  //     if (!object[o]) return false
  //   }
  //   return true
  // }

  try {
    dispatch({
      type: JOKE_LOADING,
    });
    const res = await axios.get(`https://v2.jokeapi.dev/joke/${categories}`, {
      params,
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

export const setJokesAmount = (amount) => (dispatch) => {
  dispatch({
    type: SET_JOKES_AMOUNT,
    payload: amount,
  });
};
