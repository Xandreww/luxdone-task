import { combineReducers } from "redux";
import jokes from "./jokeReducer";
import gifs from "./gifsReducer";

export default combineReducers({ jokes, gifs });
