import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../shared/FormUIElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/UIElements/Card";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";
import "./UserPlaces.css"


const UserPlaces = () => {
  const { isLoading, isError, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  let responseData;
  // const auth = useContext(AuthContext);
  const userId = useParams().userId;

  useEffect(() => {
    const showUserPlaces = async () => {
      try {
        responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/places/users/${userId}`
          // console.log(responseData,'hiiii')
        );
        // console.log(responseData, "hiiii");
        setLoadedPlaces(responseData.place);
        
      } catch (err) {
        
      }
    };
    //
    showUserPlaces();
    // console.log(userId)
    // console.log(sendRequest)
  }, [userId]);

  const handleDeletePlace = (deletePlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletePlaceId)
    );
  };

  // showUserPlaces()
  return (
    <React.Fragment>
      <ErrorModal onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={handleDeletePlace} />
      )}
       {!loadedPlaces &&!isLoading&& <div className="place-list center">
        <Card className ="places">
          <h2>No Places found. Create One?</h2>
          <Button to ="/places/new">Share Places</Button>
        </Card>
      </div>}
    </React.Fragment>
  );
};

export default UserPlaces;
