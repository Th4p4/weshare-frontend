import React, { useState, useContext } from "react";
import Input from "../../shared/FormUIElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/22.2 validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Button from "../../shared/FormUIElements/Button";
import Card from "../../shared/UIElements/Card";
import { AuthContext } from "../../shared/context/Auth-context";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/FormUIElements/ImageUpload";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, isError, sendRequest, errorHandler } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchLogin = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
      // console.log(formState.isValid, "isnt");
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: true,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        true
      );
      // console.log(formState.isValid, "yest");
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const loginHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+"/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        auth.login(responseData.userId, responseData.token);
        // console.log(responseData.user.id);
        // console.log(auth.userId, "ssssdsa");
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+"/users/signup",
          "POST",
          formData,
          { Authorization: "Bearer " + auth.token }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
    // console.log(formState.inputs);
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required!</h2>
        <hr />
        <form onSubmit={loginHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              label="Your Name"
              element="input"
              type="text"
              errorText="Please enter a valid name."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <Input
            id="email"
            label="E-mail"
            element="input"
            type="email"
            errorText="Please enter a valid Email."
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            id="password"
            label="Password"
            element="input"
            type="password"
            errorText="Please enter at least 7 characters."
            validators={[VALIDATOR_MINLENGTH(7)]}
            onInput={inputHandler}
          />
          <Button inverse disabled={!formState.isValid}>
            {isLoginMode ? "LOG IN" : "SIGN UP"}
            {/* {console.log(formState.isValid)} */}
          </Button>
        </form>
        <Button inverse onClick={switchLogin}>
          SWITCH TO
          {!isLoginMode ? " LOG IN" : " SIGN UP"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
