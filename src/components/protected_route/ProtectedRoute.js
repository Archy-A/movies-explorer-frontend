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
        return true;
    } else if (
      ((path === "movies") || 
       (path === "saved-movies") ||
       (path === "profile"))
      && 
      (props.loggedIn === false)
    ) {
        return true;
    } else {
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
