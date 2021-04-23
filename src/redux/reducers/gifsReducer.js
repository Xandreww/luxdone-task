import { GET_TRENDING_GIFS, GIFS_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  joke: null,
  error: "",
};

export default function gifs(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRENDING_GIFS:
      return { ...state, gifs: payload, loading: false };
    case GIFS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
