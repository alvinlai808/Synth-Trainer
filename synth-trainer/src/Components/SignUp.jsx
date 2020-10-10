import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../firebase";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";

import EmailForm from "./EmailForm";
import { useEffect } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState();
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "userSecondPassword") {
      setSecondPassword(value);
    }
  };

  const toggleShow = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    setPasswordsMatch(password === secondPassword);
  })

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
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
            />
          </InputGroup>

          <EmailForm />

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
                onChange={toggleShow}
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
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </Button>{" "}
        </Form>
        <p className="text-center my-3">or</p>
        <Button
          variant="primary"
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        >
          Sign In with Google
        </Button>{" "}
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
