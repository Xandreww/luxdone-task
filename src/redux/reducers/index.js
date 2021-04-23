import { combineReducers } from "redux";
import joke from "./jokeReducer";
import gifs from "./gifsReducer";

export default combineReducers({ joke, gifs });
