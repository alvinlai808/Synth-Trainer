import React, { useState } from "react";
import { auth } from "../firebase";
import {
  Alert,
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  InputGroup
} from "react-bootstrap";
import "./SignIn.css";
import EmailForm from "./EmailForm";

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
      setError("Error signing in with password and email!");
      setIsError(true);
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div>
      <Alert show={isError} variant="danger" className="text-center">
        {error}
      </Alert>
      <div className="col-sm-12 my-auto">
        <Card id="sign-in-card" className="text-center w-50">
          <Card.Title id="sign-in-label">Sign In</Card.Title>
          <Form>
            <EmailForm email={email} isValidEmail={isValidEmail} setEmail={setEmail} setIsValidEmail={setIsValidEmail}/>
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
              >
                Sign in
              </Button>
            </Form.Group>

            <Form.Group>
              <Button variant="primary">Sign in with Google</Button>
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

          <Form.Group>
            Go to main page since alvin doesnt know how to route shit{" "}
            <Button id="mainPage-button" href="MainPage">
              Main Page
            </Button>
          </Form.Group>
        </Card>
      </div>
    </div>
  );
};
export default SignIn;