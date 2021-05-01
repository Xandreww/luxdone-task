import {
  GET_JOKES,
  GET_RANDOM_JOKE,
  JOKE_ERROR,
  JOKE_LOADING,
  SET_JOKES_AMOUNT,
  SET_JOKES_BLACKLIST_FLAGS,
  SET_JOKES_CATEGORY,
  SET_JOKES_LANGUAGE,
} from "../actions/types";

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
      en: true,
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
    case SET_JOKES_CATEGORY:
      return {
        ...state,
        jokesParams: { ...state.jokesParams, category: payload },
      };
    case SET_JOKES_LANGUAGE:
      return {
        ...state,
        jokesParams: { ...state.jokesParams, lang: payload },
      };
    case SET_JOKES_BLACKLIST_FLAGS:
      return {
        ...state,
        jokesParams: { ...state.jokesParams, blacklistFlags: payload },
      };
    case JOKE_LOADING:
      return { ...state, loading: true };
    case JOKE_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
