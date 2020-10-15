import React from "react";
import { Redirect, Router, Route } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import NavBar from "./NavBar";
import { UserContext } from "../providers/UserProvider";

function Application() {
  const user = React.useContext(UserContext);
  if (user) {
    return (
      <div>
        <NavBar />
        <ProfilePage />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          {/* <Settings path="settings" /> */}
          <PasswordReset path="passwordReset" />
          <ProfilePage path="profilePage" />
        </Router>
      </div>
    );
  }
}
export default Application;
