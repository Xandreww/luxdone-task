import axios from "axios";

import { GET_TRENDING_GIFS, GIFS_ERROR } from "./types";

export const getTrendingGifs = () => async (dispatch) => {
  try {
    const res = await axios.get("https://api.giphy.com/v1/gifs/trending", {
      params: {
        api_key: process.env.REACT_APP_GIPHY_KEY,
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
