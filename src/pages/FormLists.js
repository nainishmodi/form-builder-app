import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const FormLists = () => {
  const formBuilderLists = useSelector(state => state.formBuilder);
  return (
    <>
      <div className="row justify-content-center align-items-center">
        <h4 className="text-muted">Form Lists</h4>    
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Form Name</th>
            <th>Form URL</th>
            <th>Created At</th>
            <th>Total Responses</th>
          </tr>
        </thead>
        <tbody>
            {(formBuilderLists.length > 0) && formBuilderLists.map((form) => {
             return (
                <tr key={form.formId}>
                  <td>{form.formName}</td>
                  <td>
                    <Link to={`/forms/${form.formId}`}>
                      /forms/{form.formId}
                    </Link>
                  </td>
                  <td>{format(new Date(form.formCreatedDate), 'dd/MM/yyyy hh:mm a')}</td>
                  <td>{form.submissions.length}</td>
                </tr>
             )
            })}
        </tbody>
      </table>
      {formBuilderLists.length === 0 && <p className="text-center">No forms found.</p>}
    </>
  );
};

export default memo(FormLists);
