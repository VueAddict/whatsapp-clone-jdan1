import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useState } from "react";
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route exact path="/rooms/:roomId/:seed">
                <Chat />
              </Route>
              <Route path="/">{null}</Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
