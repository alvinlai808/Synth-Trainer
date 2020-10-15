import React from "react";
import { Router } from "@reach/router";
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
