import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth } from "../firebase";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import "./SignIn.css";
import { useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const emailRegExp = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;

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

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  useEffect(() => {
    setIsValidEmail(emailRegExp.test(email));
  })

  return (
    <div>
      <div>
        <Alert show={isError} variant='danger' align>{error}</Alert>
        <div id="whole-page" class="row">
          <div class="col-sm-12 my-auto">
            <Card id="sign-in-card" className="text-center w-50">
              <Card.Title id="sign-in-label">Sign In</Card.Title>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <FormControl
                    type="email"
                    name="userEmail"
                    value={email}
                    placeholder="E.g: faruq123@gmail.com"
                    id="userEmail"
                    isInvalid={!isValidEmail}
                    isValid={isValidEmail}
                    onChange={(event) => onChangeHandler(event)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Row>
                    <Col xs={8}>
                      <FormControl
                        type="password"
                        name="userPassword"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={(event) => onChangeHandler(event)}
                      />
                    </Col>
                    <Col>
                      <Button href="passwordReset">Forgot Password?</Button>
                    </Col>
                  </Row>
                </Form.Group>
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
