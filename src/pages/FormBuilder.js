import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setForm } from '../store/formBuilder/formBuilderActions';
import Modal from '../components/Modal';
import { useHistory } from 'react-router-dom';

const initQuestions = {
    questionTitle: "",
    questionType: "text",
    questionLists: ""
};

const FormBuilder = () => {
    const [formData, setFormData] = useState( {formName: "", formQuestions: [] });
    const [showModal, setShowModal] = useState(false);
    const [formName, setFormName] = useState("");
    const [formQuestions, setFormQuestions] = useState(initQuestions);

    const dispatch = useDispatch();
    const history = useHistory();
    
    //Fn to Hide modal/popup
    const hideModal = () => {
        setShowModal(false)
    };

    //Fn to add new question to the form
    const createNewQuestion = (action) => {
        const questionLists = [...new Set(formQuestions.questionLists.split('\n'))].filter(el => el !== "");
        //Some validations
        if(!formQuestions.questionTitle.trim()) {
            alert('Please enter Question/Title');
            return;
        }
        //If choices are blank and user tried to submit record
        if(formQuestions.questionType !== 'text' && questionLists.length === 0) {
            alert('Please enter multiple choices.');
            return;
        }
        const { questionTitle, questionType } = formQuestions;
        const singleQuestion = {
            questionId: +new Date(),
            questionTitle,
            questionType,
            questionLists
        };
        const _question = formData.formQuestions.concat(singleQuestion);
        //Update the state of the form data
        setFormData((state) => {
            return {
                ...state,
                formQuestions: _question
            }
        });
        //Reset the add question form after creating successful
        setFormQuestions(initQuestions);
        //Hiding modal after added the question from the modal
        (action === 'close') && hideModal();
    };

    //Fn to handle inputs and dropdown state
    const handleInput = (e) => {
        const value = e.target.value;
        setFormQuestions((state) => {
            return {
                ...state,
                [e.target.name]: value
            }
        });
    };

    //Fn to create a form with its appropriate properties.
    const handleSubmit = (e) => {
        e.preventDefault();
        //Preparing payload to create a new form
        const payload = {
            formId: `${+new Date()}`, 
            formName: formName,
            formCreatedDate: new Date().toISOString(),
            formQuestions: formData.formQuestions,
            submissions: []
        };
        //Saving form data to the store using thunk fn.
        dispatch(setForm(payload));
        alert('Form created successfully!');
        //Redirecting user to form lists page after creating a form
        history.push('/forms');
    };

    return (
        <>
            <div className="container-fluid h-100 text-dark">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-9 col-md-9 col-lg-6 col-xl-6">
                        <form autoComplete="off" id="form-builder" onSubmit={handleSubmit}>
                            <div className="mb-1">
                                <label htmlFor="form-name" id="form-name-label" className="form-label">Form Name</label>
                                <input type="text" className="form-control" id="form-name" value={formName} onChange={(e) => setFormName(e.target.value)}/>
                            </div>
                            <br/>
                            <div className="text-center">
                                <button 
                                    type="button" 
                                    id="addQuestionBtn" 
                                    className="btn btn-secondary btn-sm text-center"
                                    onClick={() => setShowModal(true)} 
                                    disabled={(formName.trim().length < 3)}>
                                    Add Question
                                </button>
                            </div>
                            <br/><br/>
                            {formData && formData.formQuestions && (formData.formQuestions.length > 0) && 
                                <>
                                    <div className="formQuestions-section" >
                                        <p>Newly added Form Questions <strong>(Question title - Answer type)</strong></p>
                                        <ul className="list-group">
                                            {formData.formQuestions.map((q) => {
                                                return (
                                                    <li className="list-group-item" key={q.questionId}>{q.questionTitle} - {q.questionType}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <br/>
                                    <div className="text-center">
                                        <button className="btn btn-primary" type="submit">Save form</button>
                                    </div>
                                </>
                            }
                            {showModal && 
                                <Modal hideModal={hideModal}>
                                    <form autoComplete="off" name="modal-form">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Create a new question</h5>
                                            <button type="button" className="btn-close" aria-label="Close" onClick={hideModal}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="questionTitle">Question / Title</label>
                                                <input type="text" className="form-control" id="questionTitle" name="questionTitle" value={formQuestions.questionTitle} onChange={handleInput}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="questionType">Answer Type</label>
                                                <select className="form-control" id="questionType" onChange={handleInput} name="questionType" value={formQuestions.questionType}>
                                                    <option value="text">Text</option>
                                                    <option value="checkbox">Multi choice Checkbox</option>
                                                    <option value="radio">Single Select radio</option>
                                                </select>
                                            </div>  
                                            { 
                                                (formQuestions.questionType === 'checkbox' || formQuestions.questionType === 'radio') && 
                                                <>
                                                   <label htmlFor="lists">Lists</label>
                                                   <textarea rows="6" className="form-control" name="questionLists" value={formQuestions.questionLists} onChange={handleInput} placeholder="To enter multiple choices press enter after writing dedicated texts."></textarea>
                                                </>
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" onClick={hideModal}>
                                                Close 
                                            </button>
                                            <button type="button" className="btn btn-success" onClick={createNewQuestion}>
                                                Create 
                                            </button>
                                            <button type="button" className="btn btn-success" onClick={() => createNewQuestion('close')}>
                                                Create &amp; close
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormBuilder;
