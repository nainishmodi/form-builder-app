import { CREATE_FORM, SAVE_FORM } from "./formBuilderTypes";

//Fn to save some form data to the local storage
function saveStateToLocalAStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("formBuilder", serializedState);
    }
    catch(e){}
};

//Fn to get store data from the local storage
function loadStateFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("formBuilder");
        if(!serializedState) return;
        return JSON.parse(serializedState);
    }
    catch(e){}
};

const initialState = loadStateFromLocalStorage() || [];

//Form builder reducer fn.
const formBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_FORM:
            const updatedState = [
                ...state,
                action.payload
            ];
            //Saving data to the local storage after save to the store
            saveStateToLocalAStorage(updatedState);
            return updatedState;
        case SAVE_FORM:
            const formIndex = state.findIndex((f) => f.formId === action.payload.formId);
            let newState = [...state];
            newState[formIndex].submissions.push(action.payload);
            //Saving data to the local storage after save to the store
            saveStateToLocalAStorage(newState);
            return newState;
        default:
            return state;
    }
};

export default formBuilderReducer;