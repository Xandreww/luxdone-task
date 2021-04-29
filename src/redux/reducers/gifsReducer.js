import { GET_TRENDING_GIFS, GIFS_ERROR, SEARCH_GIFS, SET_TRENING_GIFS_LIMIT } from "../actions/types";

const initialState = {
  loading: false,
  trendingGifs: null,
  error: "",
  allTrendingGifs: [],
  limit: null,
};

export default function gifs(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TRENING_GIFS_LIMIT:
      return {
        ...state,
        limit: payload,
      };
    case GET_TRENDING_GIFS:
      return {
        ...state,
        trendingGifs: payload,
        allTrendingGifs: [...state.allTrendingGifs, ...payload.data],
        loading: false,
      };
    case SEARCH_GIFS:
      return { ...state, foundGifs: payload, loading: false };
    case GIFS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
