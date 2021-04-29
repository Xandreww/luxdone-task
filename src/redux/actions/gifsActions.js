import axios from "axios";

import { GET_TRENDING_GIFS, GIFS_ERROR, SEARCH_GIFS, SET_TRENING_GIFS_LIMIT } from "./types";
const giphyApi = "https://api.giphy.com/v1/gifs/";
const api_key = process.env.REACT_APP_GIPHY_KEY;

export const setTrandingGifsLimit = (limit) => (dispatch) => {
  dispatch({
    type: SET_TRENING_GIFS_LIMIT,
    payload: limit,
  });
};

export const getTrendingGifs = (offset) => async (dispatch, getState) => {
  const { gifs } = getState();
  let limit = 20;

  if (gifs.limit) {
    limit = gifs.limit;
  }

  try {
    const res = await axios.get(giphyApi + "trending", {
      params: {
        api_key,
        offset,
        limit,
      },
    });

    dispatch({
      type: GET_TRENDING_GIFS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GIFS_ERROR,
      payload: "An error occurred... No GIF's this time!",
    });
  }
};

export const searchGifs = (searchValue) => async (dispatch) => {
  try {
    const res = await axios.get(giphyApi + "search", {
      params: {
        api_key,
        q: searchValue,
      },
    });

    dispatch({
      type: SEARCH_GIFS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GIFS_ERROR,
      payload: "An error occurred... No GIF's this time!",
    });
  }
};
