import { useCallback, useEffect, useState } from "react";

function useForm(inputValues, valuesUpdatedCallback) {
  const [values, setValues] = useState(inputValues);

  useEffect(() => {
    valuesUpdatedCallback();
  },[values, valuesUpdatedCallback])

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export default useForm;
