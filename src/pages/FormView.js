import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import Questions from '../components/Questions';
import { formSubmit } from "../store/formBuilder/formBuilderActions";

const FormView = () => {
  const { id } = useParams();
  const form = useSelector((state) =>
    state.formBuilder.find((f) => f.formId === id)
  );
  //Form state
  const [formState, setFormState ] = useState({
    formId: form && form.formId
  });

  const dispatch = useDispatch();
  const history = useHistory();

  if(!form) {
    return <Redirect to="/error" />;
  };

  //fn to handle form inputs while submitting the form.
  const updateAnswer = (questionId, answer) => {
    setFormState((state) => {
        const newState = {...state, 
          [questionId]: answer
        };
        return newState;
    });
  };

  //Fn to handle form submit
  const handleSubmit = (e) => {
    //Prevent to refresh the page while submitting the form
    e.preventDefault();
    //Sending form details to the redux store
    dispatch(formSubmit(formState));
    alert('Form details submitted successfully!');
    history.push('/forms');
  };

  return (
    <>
      <h4 className="form-name text-center">{form.formName}</h4>
      <div className="container-fluid h-100 text-dark" id="form-view">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col col-sm-9 col-md-9 col-lg-6 col-xl-6">
            <form onSubmit={handleSubmit} autoComplete="off">
              {form.formQuestions.map((q) => {
                return (
                  <Questions
                    key={q.questionId}
                    formQuestions={q}
                    updateAnswer={updateAnswer}
                  />
                );
              })}
              <hr />
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormView;
