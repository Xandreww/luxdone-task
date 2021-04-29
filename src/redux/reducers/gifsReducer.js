import {
  CLEAR_SEARCH_RESULT,
  GET_TRENDING_GIFS,
  GIFS_ERROR,
  SEARCH_GIFS,
  SET_TRENING_GIFS_LIMIT,
} from "../actions/types";

const initialState = {
  loading: false,
  trendingGifs: null,
  error: "",
  limit: null,
  allTrendingGifs: [],
  allFoundGifs: [],
};

export default function gifs(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TRENING_GIFS_LIMIT:
      return {
        ...state,
        limit: payload,
        loading: false,
      };
    case GET_TRENDING_GIFS:
      return {
        ...state,
        trendingGifs: payload,
        allTrendingGifs: [...state.allTrendingGifs, ...payload.data],
        loading: false,
      };
    case SEARCH_GIFS:
      return {
        ...state,
        foundGifs: payload.data,
        searchValue: payload.searchValue,
        allFoundGifs: [...state.allFoundGifs, ...payload.data.data],
        loading: false,
      };
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        allFoundGifs: [],
      };
    case GIFS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
