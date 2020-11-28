import React from "react";
import { Router } from "@reach/router";
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
import MainWaveformTest from "./ModuleComponents/MainWaveformTest";

function Application() {
  const user = React.useContext(UserContext);
  if (user) {
    return (
      <div>
        <NavBar />
        <Router>
          <HomePage path="/" />
          <ProfilePage path="profilePage" />
          <Sandbox path="sandbox" />
          <MainWaveformModule path="module1" />
          <MainWaveformTest path="module1/test" />
          <NotFound path="404" default />
        </Router>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <Router>
          <SignIn path="/" />
          <Sandbox path="sandbox" />
          <SignUp path="signUp" />
          <PasswordReset path="passwordReset" />
        </Router>
      </div>
    );
  }
}
export default Application;
