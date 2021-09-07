import { combineReducers } from "redux";
import formBuilderReducer from "./formBuilder/formBuilderReducer";

const rootReducer = combineReducers({
    formBuilder: formBuilderReducer
});

export default rootReducer;