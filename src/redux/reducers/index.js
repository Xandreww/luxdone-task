import { combineReducers } from "redux";
import jokes from "./jokesReducer";
import gifs from "./gifsReducer";

export default combineReducers({ jokes, gifs });
