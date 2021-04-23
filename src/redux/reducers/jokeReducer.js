import { GET_RANDOM_JOKE, JOKE_ERROR, JOKE_LOADING } from "../actions/types";

const initialState = {
  loading: true,
  joke: null,
  error: "",
};

export default function joke(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RANDOM_JOKE:
      return { ...state, joke: payload, loading: false };
    case JOKE_LOADING:
      return { ...state, loading: true };
    case JOKE_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
