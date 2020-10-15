import React, { useState } from "react";
import { Link } from "@reach/router";
import {
  auth,
  generateUserDocument,
  generateUsernameDocument,
  usernames,
} from "../firebase";
import {
  Alert,
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import EmailForm from "./EmailForm";
import "./SignUp.css";
import { useEffect } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState([]);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password,
    displayName
  ) => {
    event.preventDefault();
    if (!passwordsMatch) {
      setError((error) => [...error, "Passwords don't match"]);
      setIsError(true);
    }
    if (!isValidEmail) {
      setError((error) => [...error, "Invalid Email"]);
      setIsError(true);
    }
    try {
      var docRef = usernames.doc(displayName);
      docRef.get().then(async function (doc) {
        if (doc.exists) {
          setError(error.concat("Display name already taken"));
          setIsError(true);
        } else {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
          generateUserDocument(user, { displayName });
          generateUsernameDocument(user, displayName);
        }
      });
    } catch (caughtError) {
      setError(error.concat(caughtError.message));
      setIsError(true);
    }

    setEmail("");
    setPassword("");
    setSecondPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "userSecondPassword") {
      setSecondPassword(value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setPasswordsMatch(password === secondPassword);
  }, [password, secondPassword, error]);

  return (
    <div className="mt-8 bg-secondary">
      <h1 className="text-3xl mb-2 bg-secondary text-center font-bold">
        Sign Up
      </h1>
      <div className="border border-blue-400 bg-secondary mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <Alert show={isError} variant="danger" className="text-center">
          {error.map((msg) => (
            <p>{msg}</p>
          ))}
        </Alert>
        <Card id="sign-up-card" className="text-center w-50">
          <Card.Title id="sign-in-label">Please provide your:</Card.Title>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Display Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="displayName"
                value={displayName}
                onChange={(event) => onChangeHandler(event)}
              />
            </InputGroup>
            <EmailForm
              email={email}
              isValidEmail={isValidEmail}
              setEmail={setEmail}
              setIsValidEmail={setIsValidEmail}
            />
            <InputGroup className="mb-3" controlId="formBasicPassword">
              <InputGroup.Prepend>
                <InputGroup.Text>Password</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                name="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
              <InputGroup.Append>
                <InputGroup.Text>Show Password</InputGroup.Text>
                <InputGroup.Checkbox
                  aria-label="Show Password"
                  onChange={toggleShowPassword}
                />
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3" controlId="formBasicReEnterPassword">
              <InputGroup.Prepend>
                <InputGroup.Text>Re-enter Password</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="userSecondPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={secondPassword}
                isInvalid={!passwordsMatch}
                isValid={passwordsMatch}
                onChange={(event) => onChangeHandler(event)}
              />
            </InputGroup>
            <Button
              variant="primary"
              className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(
                  event,
                  email,
                  password,
                  displayName
                );
              }}
            >
              Sign up
            </Button>{" "}
          </Form>
          <p className="text-center my-3">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};
export default SignUp;
