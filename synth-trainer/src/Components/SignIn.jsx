import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth, uiConfig } from "../firebase";
import {
  Alert,
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import "./SignIn.css";
import EmailForm from "./EmailForm";
import { navigate } from "@reach/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    if (!isValidEmail) {
      setError("Invalid Email");
      setIsError(true);
      return;
    }
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError(error.message);
      setIsError(true);
    });
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigate("/");
      }
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className = "behindPic">
      <Alert show={isError} variant="danger" className="text-center">
        {error}
      </Alert>
      <div>
        <Card id="sign-in-card" className="text-center w-50">
          <Card.Title id="sign-in-label">Sign In</Card.Title>
          <Form>
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
              <FormControl
                type="password"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
              <InputGroup.Append>
                <Button href="passwordReset">Forgot Password?</Button>
              </InputGroup.Append>
            </InputGroup>
            <Form.Group>
              <Button
                onClick={(event) => {
                  signInWithEmailAndPasswordHandler(event, email, password);
                }}
                type='submit'
              >
                Sign in
              </Button>
            </Form.Group>

            <Form.Group>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </Form.Group>
          </Form>
          <Form.Group>
            Don't have an account?{" "}
            <Button id="signup-button" href="signUp">
              Sign up here
            </Button>
          </Form.Group>
          <FormGroup>
            <Button href="passwordReset">Forgot Password?</Button>
          </FormGroup>
        </Card>
      </div>
    </div>
  );
};
export default SignIn;