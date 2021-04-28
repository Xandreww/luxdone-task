import { GET_TRENDING_GIFS, GIFS_ERROR, SEARCH_GIFS } from "../actions/types";

const initialState = {
  loading: false,
  trendingGifs: null,
  error: "",
};

export default function gifs(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRENDING_GIFS:
      console.log("state", state);
      if (!state.allTrendingGifs) {
        console.log("initial", state);
        return { ...state, trendingGifs: payload, allTrendingGifs: payload.data, loading: false };
      } else {
        console.log("new", state);
        return {
          ...state,
          trendingGifs: payload,
          allTrendingGifs: [...state.allTrendingGifs, ...payload.data],
          loading: false,
        };
      }
    case SEARCH_GIFS:
      return { ...state, foundGifs: payload, loading: false };
    case GIFS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
