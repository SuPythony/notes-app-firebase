import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.forceUpdate();
    this.uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/view',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};
  }

  render() {
    return (
      <>
      <h1>Login or Register</h1>
      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
    </>
    );
  }
}

export default Login;
