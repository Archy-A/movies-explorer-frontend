import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

  let redirectToMain = true;

  function checkRoute () {
    if (
       ((Component.name === "Login") ||
        (Component.name === "Register"))
         && 
        (props.loggedIn === true)
       ) {
        return redirectToMain = true;
    } else if (
      ((Component.name === "Movies") || 
       (Component.name === "SavedMovies") ||
       (Component.name === "Profile"))
      && 
      (props.loggedIn === false)
    ) {
        return redirectToMain = true;
    } else {
        return redirectToMain = false;
    }
  }

  return (
    <Route>
      {checkRoute() ? <Redirect to="./" /> : <Component {...props} />}
    </Route>
  );
};

export default ProtectedRoute;
