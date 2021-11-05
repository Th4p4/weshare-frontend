import React from "react";
import Card from "../../shared/UIElements/Card";

import "./PlaceList.css";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/FormUIElements/Button";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card className="center">
          <h2>No Places found. Create One?</h2>
          <Button to ="/places/new">Share Places</Button>
        </Card>
      </div>
    );
  }

  return (
    
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorID={place.creator}
          coordinates={place.location}
          onDelete = {props.onDeletePlace}
         
        />
      ))}
    </ul>
        

  );

};

export default PlaceList;
