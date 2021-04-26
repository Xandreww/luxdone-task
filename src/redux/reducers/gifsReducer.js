import { GET_TRENDING_GIFS, GIFS_ERROR, SEARCH_GIFS } from "../actions/types";

const initialState = {
  loading: false,
  joke: null,
  error: "",
};

export default function gifs(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRENDING_GIFS:
      return { ...state, trendingGifs: payload, loading: false };
    case SEARCH_GIFS:
      return { ...state, foundGifs: payload, loading: false };
    case GIFS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
