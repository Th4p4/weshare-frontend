import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/FormUIElements/Button";
import Input from "../../shared/FormUIElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/22.2 validators";
import "./NewPlace.css";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/Auth-context";
import { useHistory } from "react-router-dom";
// const DUMMY = [
//   {
//     id: "s1",
//     title: "Pathivara",
//     description: "One of the most significant temples in Nepal",
//     imageUrl:
//       "https://www.tripsorder.com/wp-content/uploads/2020/04/Kanchanjunga-pathibhara-temple-trek.jpeg",
//     address: "Pathibhar 57500",
//     location: {
//       lat: 27.4289697,
//       lng: 87.7660763,
//     },
//     creator: "u1",
//   },
//   {
//     id: "s2",
//     title: "Pathivara",
//     description: "One of the most significant temples in Nepal",
//     imageUrl:
//       "https://www.tripsorder.com/wp-content/uploads/2020/04/Kanchanjunga-pathibhara-temple-trek.jpeg",
//     address: "Pathibhar 57500",
//     location: {
//       lat: 27.4289697,
//       lng: 87.7660763,
//     },
//     creator: "u2",
//   },
// ];

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const placeId = useParams().placeId;
  const { isLoading, isError, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  


  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      // address:{
      //     value:identifiedPlace.address,
      //     isValid: true,
      // }
    },
    false
  );

  useEffect(()=>{
    const showUserPlaces = async () => {
      try {
         const responseData = await sendRequest(
         process.env.REACT_APP_BACKEND_URL +`/places/${placeId}`
          // console.log(responseData,'hiiii')
        );
        // console.log(responseData.place.title, "hiiii");
        setLoadedPlaces(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value:responseData.place.description,
              isValid: true,
            },
            address: {
              value: responseData.place.address,
              isValid: true,
            }
          },
          true,
          
        );
      } catch (err) {}
    };
    //
    showUserPlaces();
  },[placeId,setFormData])
  //   console.log(identifiedPlace.title,"title")
 
  if (isLoading){
    return <div className ="center">
      <LoadingSpinner />
    </div>
}

  if (!loadedPlaces) {
    return (
      <div className="center">
        <h2>Couldn't find the place.</h2>
      </div>
    );
  }
  const handleSubmit =async (event) => {
    event.preventDefault();
    
    try {
       await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        }),
        { "Content-Type": "application/json" ,
        'Authorization': "Bearer "+auth.token}

      );
      history.push(`/${auth.userId}/places`)

    } catch (err) {}
    // console.log(formState.inputs);
  };

 
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    {loadedPlaces && !isLoading&& <form className="place-form" onSubmit={handleSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please make change to update title."
        onInput={inputHandler}
        value={loadedPlaces.title}
        valid={loadedPlaces.title.isValid}
      />
      <Input
        id="description"
        //   element="input"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please make change to update description (at least 5 characters)."
        onInput={inputHandler}
        value={loadedPlaces.description}
        valid={loadedPlaces.description.isValid}
      />
      <Input
      id="address"
      element="input"
      type="text"
      label="Address"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please make change to update address."
      onInput = {inputHandler}
      value = {loadedPlaces.address}
      valid = {loadedPlaces.address.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        {console.log(!formState.isValid)}
        UPDATE PLACE
      </Button>
    </form>}
    </React.Fragment>
  );
};

export default UpdatePlace;
