import axios from "axios";

import { GET_TRENDING_GIFS, GIFS_ERROR, SEARCH_GIFS } from "./types";
const giphyApi = "https://api.giphy.com/v1/gifs/";
const apiKey = process.env.REACT_APP_GIPHY_KEY;

export const getTrendingGifs = () => async (dispatch) => {
  try {
    const res = await axios.get(giphyApi + "trending", {
      params: {
        api_key: apiKey,
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
        api_key: apiKey,
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
