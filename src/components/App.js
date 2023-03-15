import "../index.css";

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from "./header/Header";
import Landing from "./landing/Landing";
import Movies from "./movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Footer from "./footer/Footer";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";


function App() {
  return (
    <div className="App">
      <div className="root">
        {/* <div className="wrapper"> */}

                <Header
                />

                <Switch>
                  <Route exact path="/" component={Landing}
                  />

                  <Route exact path="/movies" component={Movies}
                  />

                  <Route exact path="/saved-movies" component={SavedMovies}
                  />

                  <Route exact path="/profile" component={Profile}
                  />

                  <Route exact path="/signup" component={Register}
                  />

                  <Route exact path="/signin" component={Login}
                  />

                  <Route exact path="/404" component={NotFound}
                  />

                </Switch>

                <Footer 
                />

        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
