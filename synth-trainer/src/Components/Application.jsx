import React from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import NavBar from "./NavBar";
import MainPage from "./MainPage";
import Sandbox from "./Sandbox";

function Application() {
  const user = null;
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
          <PasswordReset path="passwordReset" />
          <MainPage path="MainPage" />
          <Sandbox path="Sandbox" />
        </Router>
      </div>
    )
  }
  // return (
  //   <NavBar />
  //       user ?
  //       <ProfilePage />
  //     :
  //       <Router>
  //         <SignUp path="signUp" />
  //         <SignIn path="/" />
  //         <PasswordReset path = "passwordReset" />
  //       </Router>

  // );
}
export default Application;