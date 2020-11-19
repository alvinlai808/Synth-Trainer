import React from "react";
import { auth, getInProgressModules, getAllModules } from "../firebase.js"

const user = auth.currentUser
const inProgressModules = getInProgressModules(user);
const allModules = getAllModules()

const HomePage = () => {
  return (
    <div>
      <h1>UNDER CONSTRUCTION</h1>
    </div>
  )
}

export default HomePage;