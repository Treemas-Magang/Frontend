/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable eol-last */
import { legacy_createStore as createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

export default store