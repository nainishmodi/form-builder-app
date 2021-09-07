import { useState } from 'react'

const Questions = ({formQuestions, updateAnswer}) => {
    const { questionTitle, questionType, questionLists, questionId } = formQuestions;
    const [checkBoxes, setCheckBoxes] = useState([]);

    //Fn to render Radios and checkboxes dynamically
    const renderControls = () => {
        return questionLists.map((answer) => {
            if(!answer) return "";
            let fnToCall,name;
            switch (questionType) {
                case "radio":
                    fnToCall = setAnswer;
                    name = questionId;
                    break;
                case "checkbox":
                    fnToCall = checkBoxHandler;
                    name = answer;
                    break;
            }
            return (
                <div key={answer} className="form-check">
                    <input className="form-check-input" type={questionType} id={answer} name={name} value={answer} onChange={fnToCall} />
                    <label className="form-check-label" htmlFor={answer}>
                        {answer}
                    </label>
                </div>
            )
        });
    };

    //fn that handle radio btn event
    const setAnswer = (e) => {
        updateAnswer(questionId, e.target.value);
    };

    //fn that handle checkboxes event
    const checkBoxHandler = (e) => {
        const value = e.target.value;
        const ifExists = checkBoxes.indexOf(value);
        const checkBoxesLists = new Set(checkBoxes);
        if(ifExists === -1) {
            checkBoxesLists.add(value);
        } else {
            checkBoxesLists.delete(value);
        }
        const selectedCheckBoxes = [...checkBoxesLists];
        setCheckBoxes(selectedCheckBoxes);
        updateAnswer(questionId, selectedCheckBoxes);
    };

    return (
        <div className="form-group">
            <label htmlFor={questionTitle}><strong>{questionTitle}</strong></label>
            {questionType === 'text' && <input type="text" className="form-control" onChange={setAnswer} />}
            {renderControls()}
        </div>
    )
}

export default Questions;
