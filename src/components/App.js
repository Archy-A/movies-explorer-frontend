import "../index.css";

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from "./header/Header";
import Landing from "./landing/Landing";
import Movies from "./movies/Movies";
// import Footer from "./footer/Footer";

function App() {
  return (
    <div className="App">
      <div className="root">
        {/* <div className="wrapper"> */}

                <Header
                />

                {/* <Switch>
                  <Route exact path="/" component={Landing}
                  />

                  <Route exact path="/movies" component={Movies}
                  />

                </Switch> */}

                {/* <Footer /> */}

        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
