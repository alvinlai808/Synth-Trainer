import React from "react";
import { Redirect, Router, Route } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import NavBar from "./NavBar";
import Sandbox from "./Sandbox";
import { UserContext } from "../providers/UserProvider";
import { NotFound } from "./NotFound";
import HomePage from "./HomePage";
import MainWaveformModule from "./ModuleComponents/MainWaveformModule";

function Application() {
  const user = React.useContext(UserContext);
  if (user) {
    return (
      <div>
        <NavBar />
        <Router>
          <ProfilePage path="profilePage" />
          <HomePage path="/" />
          <Sandbox path="sandbox" />
          <NotFound default />
        </Router>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <Router>
          <Sandbox path="sandbox" />
          <SignUp path="signUp" />
          <SignIn path="/" default />
          {/* <Settings path="settings" /> */}
          <PasswordReset path="passwordReset" />
          <MainWaveformModule path="module1" />
        </Router>
      </div>
    );
  }
}
export default Application;
