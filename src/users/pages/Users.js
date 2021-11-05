import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import UserList from "../components/UserList";

const Users = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, isError, sendRequest, errorHandler } = useHttpClient();

  useEffect(() => {
    const sendRequests = async () => {
      // console.log( process.env.REACT_APP_BACKEND_URL+"/users/",'urllll')
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL+"/users/",
             );
             setLoadedUsers(responseData.users);
            //  console.log(responseData,'sss')
           } catch (err) {}
        }
        
    sendRequests();
  }, []);


  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner  />
        </div>
      )}
      {loadedUsers && !isLoading && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
