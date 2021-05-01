import axios from "axios";

import {
  GET_RANDOM_JOKE,
  JOKE_LOADING,
  JOKE_ERROR,
  GET_JOKES,
  SET_JOKES_AMOUNT,
  SET_JOKES_CATEGORY,
  SET_JOKES_LANGUAGE,
} from "./types";

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

  const setCategory = (categories) => {
    for (let category in categories) {
      if (categories[category]) {
        categoryArray.push(category);
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

  const setLang = (languages) => {
    if (!jokesParams.lang.en) {
      for (let language in languages) {
        if (languages[language]) {
          params.lang = language;
        }
      }
    }
  };

  setAmount(jokesParams.amount);
  setCategory(jokesParams.category);
  setLang(jokesParams.lang);

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

export const setJokesCategory = (categories) => (dispatch) => {
  dispatch({
    type: SET_JOKES_CATEGORY,
    payload: categories,
  });
};

export const setJokesLanguage = (languages) => (dispatch) => {
  dispatch({
    type: SET_JOKES_LANGUAGE,
    payload: languages,
  });
};
