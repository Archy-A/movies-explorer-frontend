import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

  const path = props.location.pathname.substring(1);

  function checkRoute () {
    if (
       ((path === "signin") ||
        (path === "signup"))
         && 
        (props.loggedIn === true)
       ) {
        console.log("-- here 1 ");
        return true;
    } else if (
      ((path === "movies") || 
       (path === "saved-movies") ||
       (path === "profile"))
      && 
      (props.loggedIn === false)
    ) {
      console.log("-- here 2 ");
        return true;
    } else {
      console.log("-- here 3 ");
        return false;
    }
  }

  return (
    <Route>
      {checkRoute() ? <Redirect to="/" /> : <Component {...props} />}
    </Route>
  );
};

export default ProtectedRoute;
