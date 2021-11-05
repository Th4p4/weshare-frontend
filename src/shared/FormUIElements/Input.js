import React, { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../shared/utils/22.2 validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "ISTOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  // console.log(props.inputState,'input')
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouch: false,
    isValid: props.isValid || false,
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };
  const touchHandler = (event) => {
    dispatch({ type: "ISTOUCH" });
  };


  
  //   const element1 =<input
  //   id={props.id}
  //   type={props.type}
  //   placeholder={props.placeholder}
  //   onBlur={touchHandler}
  //   onChange={changeHandler}
  //   value={inputState.value}
  // />
  //    const element2 =<textarea
  //     id={props.id}
  //     rows={props.rows || 3}
  //     onChange={changeHandler}
  //     value={inputState.value}
  //     onBlur={touchHandler}
  //   />

    // const checkEle = props => {
    //   if (props.element ==="input")
    //   return element1;
    //   else if (props.element ==="textarea")
    //   return element2;

    // }
    
  const element = props.element ? (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onBlur={touchHandler}
      onChange={changeHandler}
      value={inputState.value}
    />
  ) : (
    <textarea
      id={props.id}
      rows={props.rows || 3}
      onChange={changeHandler}
      value={inputState.value}
      onBlur={touchHandler}
    />
  );
  return (
    // console.log(props),
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouch && `form-control--invalid`
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {/* {console.log(element.type)} */}

      {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
