import React, { useState } from "react";
import CreateNote from "./CreateNote";
import ViewNotes from "./ViewNotes";
import EditNote from "./EditNote";
import Login from "./Login";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Button } from "react-bootstrap";


// import FormSubmitted from "./FormSubmitted";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export default function App(props, ...rest) {
  let head;
  const forceUpdate = useForceUpdate();
  const [initialized, setInitialized] = useState(false);
  const [authUser, setUser] = useState(null);
  if (window.location.pathname === "/view") {
    head = <Link to="/" onClick={forceUpdate}>Home</Link>;
  } else {
    head = <Link to="/view" onClick={forceUpdate}>Your Notes</Link>;
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setInitialized(true);
  });
  if (!initialized) {
    return (<h1>Loading...</h1>);
  }
  var logout = <></>;
  var greeting = <></>;
  if (authUser != null) {
    logout = (<Button onClick={() => {firebase.auth().signOut()}}>Sign Out</Button>);
    greeting = (<h3>Hello, {authUser.displayName}</h3>);
  } else {
    head = <Link to="/login" onClick={forceUpdate}>Login or Register</Link>
    if (window.location.pathname === "/login") {
      head = <Link to="/" onClick={forceUpdate}>Home</Link>;
    }
  }
  return (
    <>
      {greeting}
    <Router>
      {head}
      {" "}
      {logout}
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
      <Route path="/view">
      <ViewNotes user={authUser} forceUpdate={forceUpdate}/>
    </Route>
      <Route path="/create">
        <CreateNote user={authUser} forceUpdate={forceUpdate}/>
      </Route>
      <Route  {...rest} path="/edit/:title/:content/:id" render={(routeProps) => <EditNote user={authUser} {...routeProps} forceUpdate={forceUpdate}/>} />
      <Route path="/login">
        <Login forceUpdate={forceUpdate}/>
    </Route>
    <Route path="*">
      <h1>Not Found</h1>
    </Route>
      </Switch>
    </Router>
  </>
  );
};
