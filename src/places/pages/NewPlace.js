import React, { useContext } from "react";
import Input from "../../shared/FormUIElements/Input";
import "./NewPlace.css";
import Button from "../../shared/FormUIElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/22.2 validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/Auth-context";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/FormUIElements/ImageUpload";

const NewPlace = () => {
  const { isLoading, isError, sendRequest, errorHandler } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value);
    // console.log(auth.userId, "hiiii");
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      history.push("/");
    } catch (err) {}
    // console.log(formState.inputs,'error');
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      <form className="place-form" onSubmit={handleSubmit}>
        {isLoading && <LoadingSpinner asOverlay />}

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />

        <Input
          id="description"
          // element="textarea"
          label="Description"
          // rows = '3'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description ( min 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address."
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} />

        <Button type="submit" disabled={!formState.isValid}>
          {" "}
          ADD PLACE
        </Button>
        {/* {console.log(formState)} */}
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
