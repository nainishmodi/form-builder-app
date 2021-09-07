import { CREATE_FORM, SAVE_FORM } from "./formBuilderTypes";

const addForm = data => {
    return {
        type: CREATE_FORM,
        payload: data
    };
};

const saveForm = data => {
    return {
        type: SAVE_FORM,
        payload: data
    };
};

export const setForm = formData => {
    //Thunk function to set new form to the store
    return dispatch => {
        //Set timeout being used because we can assume that data is being save to the API
        //So we can assume here API post call to set a new form to the server
        setTimeout(() => {
            dispatch(addForm(formData));
        }, 1000);
    }
};

export const formSubmit = formData => {
    //Thunk function to save data to the store
    return dispatch => {
        //Set timeout being used because we can assume that data is being save to the API
        //So we can assume here API post call to submit the form details
        setTimeout(() => {
            dispatch(saveForm(formData));
        }, 1500);
    }
};