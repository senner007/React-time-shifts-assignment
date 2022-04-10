import React, { useEffect, useState } from "react";

export function InputValidator({ input, validator, setValidation, submitAttempt, errorMessage, }) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      setIsValid(validator(input.value) ? true : false);
    }, [input.value]);
  
    useEffect(() => {
      setValidation(isValid);
    }, [isValid]);
  
    return <>{!isValid && !submitAttempt ? <div className="show-error">{errorMessage}</div>  : <div></div>}</>;
  }