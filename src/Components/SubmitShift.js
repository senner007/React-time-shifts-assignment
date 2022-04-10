import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputValidator } from "./InputValidator";
import { namesValidator, dateValidator } from "../Validators/validators";
import "./submit-shift.css";

const initState = {
  userName: { value: "", isValid: false},
  startDate: { value: "", isValid: false},
  endDate: { value: "", isValid: false},
};

export const SubmitShift = ({ postShift }) => {
  const [values, setInput] = useState(initState);
  const [submitAttempt, setSubmitAttempt] = useState(true);

  const handleChange = (prop) => {
    return [
      (value) => {
        setInput({
          ...values,
          [prop]: {
            ...values[prop],
            value: value.target.value
          },
        });
      },
      (value) => setInput({ ...values, [prop]: { ...values[prop], isValid: value } }),
    ];
  };

  const [setName, setNameValidation] = handleChange("userName");
  const [setStartDate, setStartDateValidation] = handleChange("startDate");
  const [setEndDate, setEndDateValidation] = handleChange("endDate");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.userName.isValid && values.startDate.isValid && values.endDate.isValid) {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Please confirm submission")) {
        return;
      }
      alert("Shift successfully submitted!");
      // submit
      postShift(values);
      setInput(initState);
      setSubmitAttempt(true);
      return;
    }
    // not submitted
    setSubmitAttempt(false);
  };

  return (
    <div className="formInput">
      <h1>Time Registration </h1>
      <h2>{!submitAttempt && "Form is not valid!"}</h2>
      <form className="registration-form" onSubmit={handleSubmit}>

        <div className="input-field">
          <label>User Name :</label>
          <input type="text" placeholder="User Name" name="userName" value={values.userName.value} onChange={setName} />
          <InputValidator
            input={values.userName}
            validator={namesValidator}
            setValidation={setNameValidation}
            submitAttempt={submitAttempt}
            errorMessage="please enter valid name"
          ></InputValidator>
        </div>

        <div className="input-field">
          <label> Start Date : </label>
          <input type="date" name="startDate" value={values.startDate.value} onChange={setStartDate} />
          <InputValidator
            input={values.startDate}
            validator={dateValidator}
            setValidation={setStartDateValidation}
            submitAttempt={submitAttempt}
            errorMessage="please enter valid date"
          ></InputValidator>
        </div>

        <div className="input-field">
          <label>End Date : </label>
          <input type="date" name="endDate" value={values.endDate.value} onChange={setEndDate} />
          <InputValidator
            input={values.endDate}
            validator={dateValidator}
            setValidation={setEndDateValidation}
            submitAttempt={submitAttempt}
            errorMessage="please enter valid date"
          ></InputValidator>
        </div>

        <button>Submit</button>
        <Link to="/"> Shifts list </Link>
      </form>
    </div>
  );
};
