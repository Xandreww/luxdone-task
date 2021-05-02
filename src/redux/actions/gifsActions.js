import axios from "axios";

import {
  GET_TRENDING_GIFS,
  GIFS_ERROR,
  GIFS_LOADING,
  SEARCH_GIFS,
  SET_TRENING_GIFS_LIMIT,
  CLEAR_SEARCH_RESULT,
} from "./types";
const giphyApi = "https://api.giphy.com/v1/gifs/";
const api_key = process.env.REACT_APP_GIPHY_KEY;

export const setTrandingGifsLimit = (limit) => (dispatch) => {
  dispatch({
    type: SET_TRENING_GIFS_LIMIT,
    payload: limit,
  });
};

export const getTrendingGifs = () => async (dispatch, getState) => {
  const { gifs } = getState();

  let limit = 20;
  let offset = 0;
  let count = 0;

  if (gifs.limit) {
    limit = gifs.limit;
  }

  if (gifs.trendingGifs) {
    const pagination = gifs.trendingGifs.pagination;
    offset = pagination.offset;
    count = pagination.count;
  }

  dispatch({
    type: GIFS_LOADING,
  });

  try {
    const res = await axios.get(giphyApi + "trending", {
      params: {
        api_key,
        offset: offset + count + 1,
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

export const searchGifs = (searchValue) => async (dispatch, getState) => {
  const { gifs } = getState();

  let limit = 20;
  let offset = 0;
  let count = 0;
  let oldSearchValue = "";

  if (gifs.limit) {
    limit = gifs.limit;
  }

  if (gifs.foundGifs) {
    const pagination = gifs.foundGifs.pagination;
    offset = pagination.offset;
    count = pagination.count;
  }

  if (gifs.searchValue) {
    oldSearchValue = gifs.searchValue;

    if (oldSearchValue !== searchValue) {
      dispatch({
        type: CLEAR_SEARCH_RESULT,
      });
    }
  }

  dispatch({
    type: GIFS_LOADING,
  });

  try {
    const res = await axios.get(giphyApi + "search", {
      params: {
        api_key,
        q: searchValue,
        offset: offset + count + 1,
        limit,
      },
    });

    const payload = {
      data: res.data,
      searchValue,
    };

    dispatch({
      type: SEARCH_GIFS,
      payload,
    });
  } catch (err) {
    dispatch({
      type: GIFS_ERROR,
      payload: "An error occurred... No GIF's this time!",
    });
  }
};
