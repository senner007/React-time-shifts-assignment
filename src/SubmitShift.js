import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const initState = {
  userName: { value: "", isValid: false, isTouched: false },
  startDate: { value: "", isValid: false, isTouched: false },
  endDate: { value: "", isValid: false, isTouched: false },
};

export const SubmitShift = ({ postShift }) => {
  const [values, setInput] = useState(initState);
  const [validationState, setValidationState] = useState(true);

  const handleChange = (prop) => {
    return [
      (value) => {
        setInput({
          ...values,
          [prop]: {
            ...values[prop],
            value: value.target.value,
            isTouched: true,
          },
        });
      },
      (value) => setInput({ ...values, [prop]: { ...values[prop], isValid: value } }),
    ];
  };

  const [handleName, handleNameValidation] = handleChange("userName");
  const [handleStartDate, handleStartDateValidation] = handleChange("startDate");
  const [handleEndDate, handleEndDateValidation] = handleChange("endDate");

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
      setValidationState(true);
      return;
    }
    // not submitted
    setValidationState(false);
  };

  return (
    <div className="formInput">
      <h1>Time Registration </h1>
      <h2>{!validationState && "Form is not valid!"}</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>User Name :</label>
        <input
          type="text"
          placeholder="User Name"
          name="userName"
          value={values.userName.value}
          onChange={handleName}
        />
        <InputValidator
          input={values.userName}
          validator={namesValidator}
          setValidations={handleNameValidation}
          errorMessage="please enter valid name"
        ></InputValidator>

        <label> Start Date : </label>
        <input type="date" name="startDate" value={values.startDate.value} onChange={handleStartDate} />
        <InputValidator
          input={values.startDate}
          validator={dateValidator}
          setValidations={handleStartDateValidation}
          errorMessage="please enter valid date"
        ></InputValidator>

        <label>End Date : </label>
        <input type="date" name="endDate" value={values.endDate.value} onChange={handleEndDate} />
        <InputValidator
          input={values.endDate}
          validator={dateValidator}
          setValidations={handleEndDateValidation}
          errorMessage="please enter valid date"
        ></InputValidator>

        <button>Submit</button>
        <Link to="/"> Shifts list </Link>
      </form>
    </div>
  );
};

const dateValidator = (input) => {
  const valdators = [new Date(input) > new Date()];

  for (const validator of valdators) {
    if (!validator) return false;
  }
  return true;
};

const namesValidator = (input) => {
  const valdators = [input !== "", input.length < 50];

  for (const validator of valdators) {
    if (!validator) return false;
  }
  return true;
};

function InputValidator({ input, validator, setValidations, errorMessage }) {
  const [isValid, setValidation] = useState(false);

  useEffect(() => {
    setValidation(validator(input.value) ? true : false);
  }, [input.value]);

  useEffect(() => {
    setValidations(isValid);
  }, [isValid]);

  return <>{!isValid && input.isTouched && <span>{errorMessage}</span>}</>;
}
