import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth } from "../firebase";
import { Button, Card, CardColumns, Form, FormControl, InputGroup } from "react-bootstrap";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
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

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <div class="row h-100">
          <div class="col-sm-12 my-auto">
        <Card className="text-center">
        <Form >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <FormControl
              type="email"
              name="userEmail"
              value={email}
              placeholder="E.g: faruq123@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
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
        </Card>
        </div>
        </div>
        <InputGroup>
          <p>
            Don't have an account? <Link to="signUp">Sign up here</Link> <br />{" "}
            <Link to="passwordReset">Forgot Password?</Link>
          </p>
        </InputGroup>
      </div>
    </div>
  );
};
export default SignIn;
