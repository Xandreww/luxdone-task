import { GET_JOKES, GET_RANDOM_JOKE, JOKE_ERROR, JOKE_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  randomJoke: null,
  jokesData: null,
  error: "",
};

export default function joke(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RANDOM_JOKE:
      return { ...state, randomJoke: payload, loading: false };
    case GET_JOKES:
      return { ...state, jokesData: payload, loading: false };
    case JOKE_LOADING:
      return { ...state, loading: true };
    case JOKE_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
