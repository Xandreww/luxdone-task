import { GET_JOKES, GET_RANDOM_JOKE, JOKE_ERROR, JOKE_LOADING, SET_JOKES_AMOUNT } from "../actions/types";

const initialState = {
  loading: false,
  randomJoke: null,
  jokesData: null,
  jokesParams: {
    amount: 1,
    category: {
      Programming: false,
      Miscellaneous: false,
      Dark: false,
      Pun: false,
      Spooky: false,
      Christmas: false,
    },
    lang: {
      cs: false,
      de: false,
      en: false,
      es: false,
      fr: false,
      pt: false,
    },
    blacklistFlags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
  },
  error: "",
};

export default function joke(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RANDOM_JOKE:
      return { ...state, randomJoke: payload, loading: false };
    case GET_JOKES:
      return { ...state, jokesData: payload, loading: false };
    case SET_JOKES_AMOUNT:
      return {
        ...state,
        jokesParams: { ...state.jokesParams, amount: payload },
      };
    case JOKE_LOADING:
      return { ...state, loading: true };
    case JOKE_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
