import "./styles.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SingleBook from "./pages/SingleBook";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="header">
        <Link to="/">
          <h1>Book<span>Search</span></h1>
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/book/:id" children={<SingleBook />}></Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
